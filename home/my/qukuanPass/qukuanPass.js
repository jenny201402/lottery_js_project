/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "my.qukuanPass",
            loginPwd: '',
            oldPwd: '',
            newPwd: '',
            againNewPwd: '',
            hasFundPwd: false,//是否设置过资金密码
            doDpdate: function (e) {
                doDpdateHandler(e)
            },
            $skipArray: []
        })

        function doDpdateHandler(t){
            if(vmodel.loginPwd == '' && !vmodel.hasFundPwd){
                mui.toast('密码不能为空！')
                return
            }
            if(vmodel.oldPwd == '' && vmodel.hasFundPwd){
                mui.toast('密码不能为空！')
                return
            }
            if(vmodel.newPwd != vmodel.againNewPwd){
                mui.toast('密码两次输入不一致！')
                return
            }
            var data, url
            if(vmodel.hasFundPwd){
                data = {
                    oldPwd: md5(vmodel.oldPwd),
                    newPwd: md5(vmodel.newPwd),
                }
                url = setAction('user','updateFundPwd')
            }else{
                data = {
                    loginPwd: md5(vmodel.loginPwd),
                    newPwd: md5(vmodel.newPwd),
                }
                url = setAction('user','saveFundPwd')
            }
            mui(t).button('loading')
            $.ajax({
                type: 'post',
                url:url,
                data: data,
                success: function (data) {
                    console.log(JSON.stringify(data))
                    if(data.code == 0){
                        mui.toast('修改成功')
                        localStorage.setItem('hasFundPwd', true)
                        setTimeout(function () {
                            mui.back()
                        },100)
                    }
                },
                complete: function (e) {
                    mui(t).button('reset')
                },

            })
        }
        avalon.nextTick(function() {
            avalon.scan()
        })
        plus.webview.show("my.qukuanPass", "slide-in-right", 300, function() {
            vmodel.hasFundPwd = localStorage.getItem('hasFundPwd') == 'true' ? true : false
            console.log(vmodel.hasFundPwd)
        })
    })
})