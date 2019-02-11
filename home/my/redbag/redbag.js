/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "my.redbag",
            $skipArray: []
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        plus.webview.show("my.redbag", "slide-in-right", 300, function() {
            vmodel.title = _self.title;
        })
    })
})