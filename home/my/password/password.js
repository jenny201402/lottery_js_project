/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "my.password",
            oldPwd: '',
            newPwd: '',
            againNewPwd: '',
            doDpdate: function (t) {
                updateHandler(t)
            },
            $skipArray: ['doDpdate']
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        function updateHandler(t){
            if(vmodel.oldPwd == ''){
                mui.toast('旧密码不能为空！')
                return
            }
            if(vmodel.newPwd == ''){
                mui.toast('新密码不能为空！')
                return
            }
            if(vmodel.newPwd != vmodel.againNewPwd){
                mui.toast('新密码两次输入不一致！')
                return
            }
            mui(t).button('loading')
            $.ajax({
                type: 'post',
                url:setAction('user','updateMyPwd'),
                data: {
                    oldPwd: md5(vmodel.oldPwd),
                    newPwd: md5(vmodel.newPwd)
                },
                success: function (data) {
                    if(data.code == '0'){
                        mui.toast('修改成功')
                        vmodel.oldPwd = ''
                        vmodel.newPwd = ''
                        vmodel.againNewPwd = ''
                    }
                },
                complete: function (e) {
                    mui(t).button('reset')
                },

            })
        }
        plus.webview.show("my.password", "slide-in-right", 300, function() {

        })
    })
})