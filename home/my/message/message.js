/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "my.message",
            $skipArray: []
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        mui.init({
            subpages:[{
                url:'messageList.html',//下拉刷新内容页面地址
                id:'message.list',//内容页面标志
                styles:{
                    top:'44px',
                    bottom:'0'
                }
            }]
        })
        plus.webview.show("my.message", "slide-in-right", 300, function() {

        })
    })
})