/**
 * Created by Administrator on 2018/6/21 0021.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "registered",
            userName: '',
            password: '',
            againPassword: '',
            fullName: '',
            path: '',
            Registered: function (t) {
                RegisteredHandler(t)
            },
            $skipArray: ['Registered']
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        //注册
        function RegisteredHandler(t){
            document.activeElement.blur()
            if(vmodel.userName == '' || vmodel.againPassword == '' || vmodel.password == '' || vmodel.fullName == ''){
                mui.toast('必填项不能为空！')
                return
            }

            if(vmodel.againPassword != vmodel.password){
                mui.toast('两次输入密码不一致！')
                return
            }
            mui(t).button('loading')
            $.ajax({
                type: 'post',
                url: setAction('base','reg'),
                data: {
                    userName: vmodel.userName,
                    password: md5(vmodel.password),
                    fullName: vmodel.fullName
                },
                showLoader: false,
                success: function(data){
                    if(data.code == '0'){
                        localStorage.setItem('token',data.data.token)
                        mui.toast('注册成功！')
                        if(vmodel.path === 'login'){
                            //传值回到登录页面
                            mui.fire(plus.webview.getWebviewById('login'), 'registered.success',{
                                userName: vmodel.userName,
                                password:vmodel.password
                            })
                            setTimeout(function () {
                                mui.back()
                            },1000)
                        }else if(vmodel.path === 'index'){
                            mui.fire(plus.webview.getWebviewById('app.index'), 'login.success')
                            setTimeout(function () {
                                mui.back()
                            },1000)
                        }
                    }
                },
                complete: function (e) {
                    mui(t).button('reset')
                },
            })
        }
        plus.webview.show("registered", "slide-in-right", 300, function() {
            vmodel.path = _self.path
        })
    })
})