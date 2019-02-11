/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "my.personal",
            username: '----',
            fullName: '----',
            currency: '----',
            balance: '----',
            $skipArray: []
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        $.ajax({
            type: 'post',
            url:setAction('base','getUserMsg'),
            success: function (data) {
                console.log(JSON.stringify(data))
                if(data.code == '0'){
                    vmodel.username = data.data.username
                    vmodel.fullName = data.data.fullName
                    vmodel.currency = data.data.currency
                    vmodel.balance = data.data.balance
                }
            },
        })
        plus.webview.show("my.personal", "slide-in-right", 300, function() {

        })
    })
})