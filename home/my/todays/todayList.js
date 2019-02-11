/**
 * Created by Administrator on 2018/6/8 0008.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "today.list",
            page: '0',
            rows: '10',
            List: [],
            gameMap: {},
            plays: {},
            playCates: {},
            $skipArray: ['']
        })
        avalon.nextTick(function () {
            avalon.scan()
        })

        function getList(){
            $.ajax({
                type: 'get',
                url:setAction('lottery','getSettled'),
                data: {
                    page: vmodel.page,
                    rows: vmodel.rows
                },
                showLoader: vmodel.page === '1',
                success: function (data) {
                    //console.log(JSON.stringify(data))
                    var arr = vmodel.List.$model.concat([])
                    vmodel.List = arr.concat(data.data)
                    mui.fire(plus.webview.getWebviewById('my.todays'), 'today.info',{info: data.otherData})
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(vmodel.List.length >= data.totalCount)
                }
            })
        }
        mui.init({
            swipeBack: false,
            pullRefresh: {
                height:50,
                container: '#pullrefresh',
                up: {
                    contentrefresh: '正在加载...',
                    contentnomore: '暂无更多数据',
                    auto:true,
                    callback: pullupRefresh
                }
            }
        });
        /**
         * 下拉刷新具体业务实现
         */
        function pullupRefresh() {
            setTimeout(function () {
                vmodel.page++
                getList()
            },1000)
        }
        vmodel.gameMap = gameMap //彩种名称
        vmodel.plays = plays //小项
        vmodel.playCates = playCates //玩法
    });
})()