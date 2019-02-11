/**
 * Created by Administrator on 2018/6/8 0008.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "twoface.list",
            gameId: self.gameId,
            showView: false,
            list: [],
            $skipArray: ['showDetail']
        })
        avalon.nextTick(function () {
            avalon.scan()
        })

        function getList(a){
            $.ajax({
                type: 'get',
                url:setAction('lottery','clong')+vmodel.gameId+'.json',
                showLoader: a == 1 ? false : true,
                success: function (data) {
                    vmodel.list = data.line_right
                },
                complete: function(){
                    vmodel.showView = true
                    if(a ==1){
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh()
                    }
                }
            })
        }
        getList()
        mui.init({
            swipeBack: false,
            pullRefresh: {
                height:50,
                container: '#pullrefresh',
                down: {
                    contentrefresh: '正在加载...',
                    contentnomore: '暂无更多数据',
                    callback: function () {
                        getList(1)
                    }
                }
            }
        })
    })
})()