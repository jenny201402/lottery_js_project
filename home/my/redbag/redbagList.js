/**
 * Created by Administrator on 2018/6/8 0008.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "redbag.list",
            $skipArray: ['']
        })
        avalon.nextTick(function () {
            avalon.scan()
        })
        mui.init({
            swipeBack: false,
            pullRefresh: {
                container: '#pullrefresh',
                up: {
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
        /**
         * 下拉刷新具体业务实现
         */
        function pullupRefresh() {
            setTimeout(function () {
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(false)
            },1000)
            mui.toast('上拉刷新成功');
        }
    });
})()