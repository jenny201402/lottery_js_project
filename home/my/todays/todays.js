/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "my.todays",
            show: false,
            info: {},
            $skipArray: []
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        plus.webview.show("my.todays", "slide-in-right", 300, function() {
            console.log(_self)
            vmodel.title = _self.title
            window.addEventListener('today.info', function (e) {
                vmodel.info = e.detail.info
                vmodel.show = true
            })
        })
    })
})