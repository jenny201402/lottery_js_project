/**
 * Created by luke on 2018/6/21 0021.
 * AJAX全局配置
 */
var $doc = $(document)

// 全局 ajax 配置
$.ajaxSetup({
    type: "POST",
    dataType: "json",
    timeout: 20000,
    cache: true,
    dataFilter: function(data, dataType) {
        var type = this.type.toLowerCase()
        if (type === 'post' || type === 'get') {
            switch (dataType) {
                // 对json数据进行处理
                case 'json':
                    var res = JSON.parse(data)
                    var type = avalon.type(res.status)
                    if (type !== 'null' && type !== 'undefined'){
                        res.status = '' + res.status
                    }
                    data = JSON.stringify(res)
                    break
            }
        }
        return data
    },
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Device-Name", plus.device.model)
        this.showLoader = avalon.type(this.showLoader) === "undefined" ? true : this.showLoader
        this.showLoader && plus.nativeUI.showWaiting(this.showText)
    },
    statusCode: {
        200: function() {

        },
        502: function() {
            mui.toast('您的请求错误')
        },
        /*401: function() {
            mui.toast('账号密码不匹配')
        },*/
        404: function() {
            mui.toast('您请求的数据不存在')
        }
    }
})

$doc.ajaxComplete(function(e, xhr, opts){
    switch(xhr.statusText) {
        case 'timeout':
            mui.toast('请求超时')
            break
    }
    opts.showLoader && plus.nativeUI.closeWaiting()
})

$doc.ajaxError(function(e, xhr, opts){
    if(xhr.readyState == 0){
        mui.toast('无法连接网络,请查看网络设置')
    }
})

$doc.ajaxSuccess(function(e, xhr, opts){
    if (opts.dataType.toLowerCase() === 'json') {
        if(xhr.responseJSON.response === 'error' || xhr.responseJSON.code !=0){
            mui.toast(xhr.responseJSON.msg)
        }
    }
})