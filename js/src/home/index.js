/**
 * Created by Administrator on 2018/6/22 0022.
 */
$(function() {
    mui.plusReady(function() {

        var _webviews = {}

        // 获取当前窗口
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "main.home",
            current: '',
            title: '',
            loginStatus: '',
            username: '--',
            // 切换主菜单
            swichTabHandler: function(index) {
                if(index === 'home/money.home.html' && localStorage.getItem('guest') === 'true'){
                    mui.toast('试玩账号无法使用该功能！')
                    return
                }
                if(index === 'home/money.home.html' || index === 'home/chat.home.html' || index === 'home/my.home.html'){
                    if(!vmodel.loginStatus){
                        plus.webview.create('home/login/index.html', 'login',{ 'popGesture':'close'})
                        return
                    }
                    mui.fire(plus.webview.getWebviewById(index), 'update.message')
                }
                if(index === 'home/money.home.html'){
                    if(localStorage.getItem('hasFundPwd') != 'true'){
                        mui.confirm('您还未设置提款密码，点击确定立即设置','提示',['取消','确定'],function(e){
                            if(e.index == '1'){
                                plus.webview.create('home/my/qukuanPass/qukuanPass.html', 'my.qukuanPass', {
                                    bounce: 'none',
                                    'popGesture':'close'
                                })
                            }
                        })
                        return
                    }
                    mui.fire(plus.webview.getWebviewById('home/money.home.html'), 'go.ck')
                }
                vmodel.current = index
            },
            logout: function () {
                mui.confirm('确认退出登录？','500万彩票',['确认','取消'], function (e) {
                    if (e.index == 0) {
                        logoutHandler()
                    }
                })
            },
            login: function () {
                plus.webview.create('home/login/index.html', 'login',{ 'popGesture':'close'})
            },
            register:  function () {
                plus.webview.create('home/registered/index.html', 'registered',{ 'popGesture':'close'},{path:'index'})
            },
            tryPlay: function () {
                tryPlayHandler()
            },
            goPer: function () {
                vmodel.current = 'home/my.home.html'
            },
            $skipArray: ['swichTabHandler','logout','login','register','tryPlay','goPer']
        })
        //判断登录状态，初始化数据
        function checkLoginStatus(){
            $.ajax({
                type: 'post',
                url:setAction('base','init'),
                showLoader: false,
                success: function (data) {
                    vmodel.loginStatus = true
                    vmodel.username = data.userName
                    localStorage.setItem('username',data.userName)
                    localStorage.setItem('guest',false)//游客模式
                    localStorage.setItem('hasFundPwd',data.hasFundPwd)//是否设置支付密码
                    localStorage.setItem('money',data.money)
                    localStorage.setItem('loginStatus',true)//登录状态
                },
                error: function (e) {
                    vmodel.loginStatus = false
                    localStorage.setItem('loginStatus',false)//登录状态
                    localStorage.setItem('guest',false)//游客模式
                }
            })
        }
        checkLoginStatus()
        //退出登录
        function logoutHandler(){
            localStorage.clear()
            vmodel.loginStatus = false
            _webviews = {}
            vmodel.current = 'home/index.home.html'
            // 获取主页需要关闭的窗口
            //var arr = ['home/lottery.home.html','open_list','home/money.home.html','tab-top-subpage-1.html','tab-top-subpage-2.html','tab-top-subpage-3.html',' money.ckjl.list','tab-top-subpage-4.html','money.qkjl.list','home/my.home.html']
            //所有窗口对象
            var wvs = plus.webview.all();
            //首页窗口对象
            var launch = plus.webview.getLaunchWebview();
            //当前窗口对象
            var self = plus.webview.currentWebview();
            // 首页以及当前窗口对象，不关闭；
            for (var i = 0,len = wvs.length; i < len; i++) {
                //选定某一页不关wvs[i].id === localStorage.homeWebId
                if (wvs[i].id === launch.id
                    || wvs[i].id === self.id
                    ||wvs[i].id === 'home/index.home.html') {
                    continue;
                } else {
                    //关闭中间的窗口对象，为防止闪屏，不使用动画效果；
                    wvs[i].close('none');
                }
            }
            /*$.ajax({
                type: 'get',
                url:setAction('base','logout'),
                success: function (data) {
                    localStorage.clear()
                    vmodel.loginStatus = false
                    _webviews = {}
                    vmodel.current = 'home/index.home.html'
                    // 获取主页需要关闭的窗口
                    //var arr = ['home/lottery.home.html','open_list','home/money.home.html','tab-top-subpage-1.html','tab-top-subpage-2.html','tab-top-subpage-3.html',' money.ckjl.list','tab-top-subpage-4.html','money.qkjl.list','home/my.home.html']
                    //所有窗口对象
                    var wvs = plus.webview.all();
                    //首页窗口对象
                    var launch = plus.webview.getLaunchWebview();
                    //当前窗口对象
                    var self = plus.webview.currentWebview();
                    // 首页以及当前窗口对象，不关闭；
                    for (var i = 0,len = wvs.length; i < len; i++) {
                        //选定某一页不关wvs[i].id === localStorage.homeWebId
                        if (wvs[i].id === launch.id
                            || wvs[i].id === self.id
                            ||wvs[i].id === 'home/index.home.html') {
                            continue;
                        } else {
                            //关闭中间的窗口对象，为防止闪屏，不使用动画效果；
                            wvs[i].close('none');
                        }
                    }
                }
            })*/
        }
        vmodel.$watch('current', function(a, b) {
            vmodel.title = 	a === 'home/index.home.html' ? '500万彩票' : a === 'home/lottery.home.html' ? '开奖' : a === 'home/money.home.html' ? '资金' : '我的'
            if (_webviews[a]) {
                //已经创建的窗口初始化数据
                mui.fire(plus.webview.getWebviewById(a),'update.message')
                _webviews[a].show()
            } else {
                // 新建子页面
                _webviews[a] = creatSubWebview({
                    id: a,
                    url: a
                })
                _self.append(_webviews[a])
            }
            _webviews[b] && _webviews[b].hide()
        })
        // 创建子窗口
        function creatSubWebview(opts) {
            return plus.webview.create(
                opts.url,
                opts.id, {
                    top: '44px',
                    bottom: '50px'
                }
            )
        }
        //监听登陆成功
        window.addEventListener('login.success', function () {
            checkLoginStatus()
        })
        //监听跳转资金模块
        window.addEventListener('change.tab', function () {
            vmodel.current = 'home/money.home.html'
        })
        //试玩账号
        function tryPlayHandler(){
            $.ajax({
                type: 'post',
                url:setAction('base','guestLogin'),
                success: function (data) {
                    if(data.code == '0'){
                        mui.toast('登录成功')
                        vmodel.loginStatus = true
                        vmodel.username = '游客'
                        localStorage.setItem('username','游客')//用户名
                        localStorage.setItem('money',data.data.money)//用户余额
                        localStorage.setItem('guest',true)//游客模式
                        localStorage.setItem('loginStatus',true)//登录状态
                    }
                }
            })
        }
        //轮训玩家登陆信息
        function getUserMsg(){
            
        }
        //监听注册页面试玩按钮
        window.addEventListener('try.play', function () {
            tryPlayHandler()
        })
        vmodel.current = 'home/index.home.html'
        // 初始化模块
        mui.init({
            beforeback: function() {
                // 销毁子窗口
                avalon.each(_webviews, function(key, item) {
                    plus.webview.close(item)
                })
                return true
            }
        })
        //安卓监听主页返回键事件
        var first = null
        mui.back=function(){
            if(!first){
                first = new Date().getTime()
                mui.toast('再按一次退出应用')
                setTimeout(function(){
                    first = null
                },2000)
            } else {
                if(new Date().getTime() - first < 2000){
                    plus.runtime.quit()
                }
            }
        };
        avalon.nextTick(function() {
            avalon.scan()
        })
    })

})