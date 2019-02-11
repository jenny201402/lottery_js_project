/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "record.gamaRules",
            name: '',
            gameId: '',
            html: '',
            $skipArray: []
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        plus.webview.show("record.gamaRules", "slide-in-right", 300, function() {
            vmodel.name = _self.name
            vmodel.gameId = _self.gameId
            vmodel.html = rules[_self.gameId]
        })
    })
})