/**
 * Created by Administrator on 2018/6/5 0005.
 * 主页
 */
(function() {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        //轮播
        var List = lotteryList
        var vmodel = avalon.define({
            $id: "player.lottery",
            showView: false,
            sliders: [],
            notices: [],
            lotteryList:[],
            openBaseModule: function (el) {
                delay_till_last('click', function() {//注意 id 是唯一的
                    if(localStorage.getItem('loginStatus') != 'true'){
                        mui.toast('请先登录')
                        return
                    }
                    plus.webview.create(el.path, 'base.'+el.code, {
                        bounce: 'none',
                        'popGesture':'close'
                    },{
                        name:el.name,
                        gameId: el.id
                    })
                   /* $.ajax({
                        type: 'post',
                        url:setAction('base','init'),
                        success: function (data) {
                            plus.webview.create(el.path, 'base.'+el.code, {
                                bounce: 'none',
                                'popGesture':'close'
                            },{
                                name:el.name,
                                gameId: el.id
                            })
                        },
                        error: function (e) {
                            plus.webview.create('../home/login/index.html', 'login',{ 'popGesture':'close'})
                        }
                    })*/
                }, 500)
            },
            showNotice: function (el) {
                mui.confirm(el.content,el.title,['取消','确定'])
            },
            service: function () { //客服
                delay_till_last('click', function() {
                    plus.webview.create('my/service/service.html', 'my.service', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500);
            },
            recharge: function () {
                if(localStorage.getItem('loginStatus') != 'true'){
                    mui.toast('请先登录')
                    return
                }
                if(localStorage.getItem('guest')  === 'true'){
                    mui.toast('试玩账号无法使用该功能')
                    return
                }
                mui.fire(plus.webview.getWebviewById('app.index'), 'change.tab')
                mui.fire(plus.webview.getWebviewById('home/money.home.html'), 'go.ck')
            },
            tkuan: function () {
                if(localStorage.getItem('loginStatus') != 'true'){
                    mui.toast('请先登录')
                    return
                }
                if(localStorage.getItem('guest') === 'true'){
                    mui.toast('试玩账号无法使用该功能')
                    return
                }
                mui.fire(plus.webview.getWebviewById('app.index'), 'change.tab')
                mui.fire(plus.webview.getWebviewById('home/money.home.html'), 'go.qk')
            },
            $skipArray: ['openBaseModule','showNotice','service','recharge','tkuan']
        })
        function getLotteryList(a){
            $.ajax({
                type: 'get',
                url:setAction('lottery','getHomeLotteryData',true),
                showLoader: !a,
                success: function (data) {
                    if(data.code == '0'){
                        vmodel.sliders = data.data.sliders.data
                        vmodel.notices = data.data.notices
                        getShowLottery(data.data.games)
                        vmodel.showView = true
                    }
                },
                complete: function(){
                    if(a){
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                    }else{
                        var slider = mui("#slider")
                        slider.slider({
                            interval: 1000
                        })
                    }
                }
            })
        }

        function getShowLottery(arr){
            var Array = []
            avalon.each(arr, function (a,b) {
                avalon.each(List, function (index,item) {
                    if(b.game_id == item.id){
                        Array.push(item)
                    }
                })
            })
            vmodel.lotteryList = Array
        }
        getLotteryList()
        mui.init({
            swipeBack: false,
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    contentrefresh: '正在加载...',
                    contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        getLotteryList(1)
                    }
                }
            }
        });
        avalon.nextTick(function () {
            avalon.scan()
        })
    });
})();