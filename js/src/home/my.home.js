/**
 * Created by Administrator on 2018/6/5 0005.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "my.home",
            username: '----',
            userMoney: '----',
            openRedbagModule: function() {
                if(localStorage.getItem('guest') === 'true' ){
                    mui.toast('试玩账号无法使用该功能！')
                    return
                }
                delay_till_last('click', function() {
                    plus.webview.create('my/redbag/redbag.html', 'my.redbag', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500);
            },
            openPersonalModule: function() {
                if(localStorage.getItem('guest') === 'true' ){
                    mui.toast('试玩账号无法使用该功能！')
                    return
                }
                delay_till_last('click', function() {
                    plus.webview.create('my/personal/personal.html', 'my.personal', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500);
            },
            openPasswordModule: function() {
                if(localStorage.getItem('guest') === 'true' ){
                    mui.toast('试玩账号无法使用该功能！')
                    return
                }
                delay_till_last('click', function() {
                    plus.webview.create('my/password/password.html', 'my.password', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500);
            },
            openMessageModule: function() {
                if(localStorage.getItem('guest') === 'true' ){
                    mui.toast('试玩账号无法使用该功能！')
                    return
                }
                delay_till_last('click', function() {
                    plus.webview.create('my/message/message.html', 'my.message', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500);
            },
            openMoneyModule: function () {
                if(localStorage.getItem('guest') === 'true' ){
                    mui.toast('试玩账号无法使用该功能！')
                    return
                }
                delay_till_last('click', function() {
                    if(localStorage.getItem('hasFundPwd') != 'true'){
                        mui.confirm('您还未设置提款密码，点击确定立即设置','提示',['取消','确定'],function(e){
                            if(e.index == '1'){
                                plus.webview.create('my/qukuanPass/qukuanPass.html', 'my.qukuanPass', {
                                    bounce: 'none',
                                    'popGesture':'close'
                                })
                            }
                        })
                        return
                    }
                    mui.fire(plus.webview.getWebviewById('app.index'), 'change.tab')
                    mui.fire(plus.webview.getWebviewById('home/money.home.html'), 'go.ck')
                }, 500);
            },
            openQukuanPassModule: function() {
                if(localStorage.getItem('guest') === 'true' ){
                    mui.toast('试玩账号无法使用该功能！')
                    return
                }
                delay_till_last('click', function() {
                    plus.webview.create('my/qukuanPass/qukuanPass.html', 'my.qukuanPass', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500);
            },
            openBankcardModule: function() {
                if(localStorage.getItem('guest') === 'true' ){
                    mui.toast('试玩账号无法使用该功能！')
                    return
                }
                delay_till_last('click', function() {
                    if(localStorage.getItem('hasFundPwd') != 'true'){
                        mui.toast('请先设置取款密码')
                        plus.webview.create('my/qukuanPass/qukuanPass.html', 'my.qukuanPass', {
                            bounce: 'none',
                            'popGesture':'close'
                        })
                        return
                    }
                    plus.webview.create('my/bankcard/bankcard.html', 'my.bankcard', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500);
            },
            openTodaysModule: function() {
                if(localStorage.getItem('guest') === 'true' ){
                    mui.toast('试玩账号无法使用该功能！')
                    return
                }
                delay_till_last('click', function() {
                    plus.webview.create('my/todays/todays.html', 'my.todays', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500);
            },
            openBettingModule: function() {
                if(localStorage.getItem('guest') === 'true' ){
                    mui.toast('试玩账号无法使用该功能！')
                    return
                }
                delay_till_last('click', function() {
                    plus.webview.create('my/betting/betting.html', 'my.betting', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500);
            },
            openServiceModule: function() {
                delay_till_last('click', function() {
                    plus.webview.create('my/service/service.html', 'my.service', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500);
            },
            refresh: function () {//刷新用户余额
                getmoney()
            },
            $skipArray: ['refresh','openRedbagModule','openPersonalModule','openPasswordModule','openMessageModule','openQukuanPassModule','openBankcardModule','openTodaysModule','openBettingModule','openServiceModule','openMoneyModule']
        })
        //获取用户余额
        function getmoney(b){
            $.ajax({
                type: 'post',
                showLoader: b,
                url: setAction('base','getMoney'),
                success: function (data) {
                    vmodel.userMoney = data
                }
            })
        }
        //初始化数据
        function initData(){
            vmodel.username = localStorage.getItem('username')
            getmoney(false)
        }
        initData()

        window.addEventListener('update.message', function () {
            initData()
        })
        avalon.nextTick(function () {
            avalon.scan()
        })
    });
})()