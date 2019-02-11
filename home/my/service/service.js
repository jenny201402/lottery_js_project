/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var _sub = null
        var vmodel = avalon.define({
            $id: "my.service",
            $skipArray: []
        })
        avalon.nextTick(function() {
            avalon.scan()
        })

        mui.init({
            beforeback: function() {
                plus.nativeUI.showWaiting()
                setTimeout(function() {
                    _sub.close()
                    _self.close("slide-out-right")
                    plus.nativeUI.closeWaiting()
                }, 1000)
                return false
            }
        })
        /*https://static.meiqia.com/dist/standalone.html?_=t&eid=52896*/
        plus.webview.show("my.service", "slide-in-right", 300, function() {
            _sub = plus.webview.create('https://static.meiqia.com/dist/standalone.html?_=t&eid=52896', "service", {
                top: "44px",
                bottom: 0
            })
            _sub.show()
            _self.append(_sub)
        })
    })
})