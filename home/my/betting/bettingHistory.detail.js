/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "betting.history.detail",
            $skipArray: []
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        mui.init({
            subpages:[{
                url:'bettingHistory.detail.list.html',//下拉刷新内容页面地址
                id:'bettingHistory.detail.list',//内容页面标志
                styles:{
                    top:'77px',
                    bottom:'0'
                },
                extras:{date: _self.date}
            }]
        })
        plus.webview.show("betting.history.detail", "slide-in-right", 300, function() {

        })
    })
})