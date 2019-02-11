/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "my.betting",
            show: false,
            otherData: {},
            $skipArray: []
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        //监听事件
        window.addEventListener('betting.message', function (e) {
            vmodel.otherData = e.detail.otherData
            vmodel.show = true
        })
        mui.init({
            subpages:[{
                url:'bettingList.html',//下拉刷新内容页面地址
                id:'betting.list',//内容页面标志
                styles:{
                    top:'77px',
                    bottom:'41px'
                }
            }]
        })
        plus.webview.show("my.betting", "slide-in-right", 300, function() {

        })
    })
})