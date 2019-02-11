/**
 * Created by Administrator on 2018/6/5 0005.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "money.ckjl.list",
            page: '0',
            rows: '10',
            messageList: [],
            showDetail: function (el) {
                floatw=plus.webview.create(
                    "webview.float.html","webview.float",
                    {width:'90%',height:'420px',margin:"auto",background:"rgba(0,0,0,0.4)",scrollIndicator:'none',scalable:false,popGesture:'none'},
                    {
                        el: el,
                        type: '1'
                    }
                )
                floatw.addEventListener("loaded",function(){
                    floatw.show('fade-in',300)
                    floatw=null
                },false)
                //mui.alert( '交易编码：435268791523\n发起时间：2015-01-12 12:25:32\n交易类型：提现\n交易金额：1000\n手续费用：0\n提现银行：中国银行\n银行卡号：628848789456321\n持卡人：xxx\n审核时间：未审核', '查看详情', '确定' )
            },
            $skipArray: ['showDetail']
        })
        avalon.nextTick(function () {
            avalon.scan()
        })

        //接收页面更新事件
        window.addEventListener('update.handler', function () {
            vmodel.page = 0
            vmodel.messageList = []
            mui('#pullrefresh').pullRefresh().pullupLoading()
            mui('#pullrefresh').pullRefresh().scrollTo(0,0,100)
            mui('#pullrefresh').pullRefresh().refresh(true)
        })
        //获取存款记录数据
        function getList(a){
            $.ajax({
                type: 'get',
                url:setAction('base','getRechList'),
                data: {
                    page: vmodel.page,
                    rows: vmodel.rows
                },
                showLoader: false,
                success: function (data) {
                    if(a == 1){
                        vmodel.messageList = data.data
                    }else{
                        var arr = vmodel.messageList.$model.concat([])
                        vmodel.messageList = arr.concat(data.data)
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(vmodel.messageList.length >= data.totalCount)
                    }
                },
                complete: function () {
                    if(a == 1){
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh()
                        mui('#pullrefresh').pullRefresh().enablePullupToRefresh()
                    }
                }
            })
        }
        mui.init({
            swipeBack: false,
            pullRefresh: {
                height:100,
                container: '#pullrefresh',
                up: {
                    contentrefresh: '正在加载...',
                    auto:true,
                    contentnomore: '暂无更多数据',
                    callback: pullupRefresh
                },
                down: {
                    height:50,//可选,默认50.触发下拉刷新拖动距离,
                    contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback : function () {
                        vmodel.page = 1
                        getList(1)
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
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
    });
})()