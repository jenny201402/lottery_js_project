/**
 * Created by Administrator on 2018/6/21 0021.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "login",
            username: '',
            password: '',
            login: function (t) {
                document.activeElement.blur()
                setTimeout(function(){
                    mui(t).button('loading')
                },100)
                if(vmodel.username == '' || vmodel.password == ''){
                    mui.toast('用户名或密码不能为空！')
                    return
                }
                $.ajax({
                    type: 'post',
                    url:setAction('base','login',true),
                    showLoader: false,
                    data:{
                        username: vmodel.username,
                        password: md5(vmodel.password)
                    },
                    success: function (data) {
                        if(data.code == '0'){
                            localStorage.setItem('token',data.data.token)
                            mui.fire(plus.webview.getWebviewById('app.index'), 'login.success')
                            mui.back()
                            mui.toast('登陆成功！')
                        }
                    },
                    complete: function (e) {
                        mui(t).button('reset')
                    },
                })
            },
            openRegistered: function () {
                delay_till_last('click', function() {
                    plus.webview.create('../registered/index.html', 'registered',{ 'popGesture':'close'},{path:'login'})
                }, 500)
            },
            freePlayHandler: function () {
                mui.fire(plus.webview.getWebviewById('app.index'), 'try.play')
                mui.back()
            },
            $skipArray: ['login','openRegistered','freePlayHandler']
        })
        //接受注册成功事件

        window.addEventListener('registered.success', function (e) {
            vmodel.username = e.detail.userName
            vmodel.password = e.detail.password
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        plus.webview.show("login", "slide-in-right", 300, function() {

        })
    })
})