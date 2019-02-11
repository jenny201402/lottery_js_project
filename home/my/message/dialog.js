/**
 * Created by Administrator on 2018/6/5 0005.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "message.dialog",
            info: {},
            back: function () {
                self.close()
            },
            $skipArray: []
        })
        vmodel.info = self.el
        console.log(JSON.stringify(vmodel.info))
        avalon.nextTick(function () {
            avalon.scan()
        })
    })
})()