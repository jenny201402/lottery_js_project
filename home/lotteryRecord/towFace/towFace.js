/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "record.towFace",
            $skipArray: []
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        plus.webview.show("record.towFace", "slide-in-right", 300, function() {

        })
        mui.init({
            subpages:[{
                url:'list.html',//下拉刷新内容页面地址
                id:'twoface.list',//内容页面标志
                styles:{
                    top:'44px',//104
                    bottom:'0'
                },
                extras:{
                    gameId: _self.gameId
                }
            }]
        })
    })
})