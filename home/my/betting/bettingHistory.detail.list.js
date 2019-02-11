/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "bettingHistory.detail.list",
            date: '',
            list: [],
            $skipArray: []
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        function getList(a){
            $.ajax({
                type: 'get',
                url:setAction('lottery','getStatBetsDetail'),
                data: {
                    curDate: vmodel.date
                },
                showLoader: a == 1 ? false : true,
                success: function (data) {
                    if(data.code == 0){
                        vmodel.list = data.data
                    }
                },
                complete: function(){
                    if(a == 1){
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                    }
                }
            })
        }
        mui.init({
            swipeBack: false,
            pullRefresh: {
                height:50,
                container: '#pullrefresh',
                down: {
                    contentrefresh: '正在加载...',
                    contentnomore: '暂无更多数据',
                    callback: pullupRefresh
                }
            }
        });
        /**
         * 下拉刷新具体业务实现
         */
        function pullupRefresh() {
            setTimeout(function () {
                getList(1)
            },1000)
        }
        plus.webview.show("bettingHistory.detail.list", "slide-in-right", 300, function() {
            vmodel.date = _self.date
            getList()
        })
    })
})