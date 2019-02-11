/**
 * Created by Administrator on 2018/6/5 0005.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "open.lottery",
            text:'哈哈哈',
            $skipArray: []
        })
        avalon.nextTick(function () {
            avalon.scan()
        })
    });
})()