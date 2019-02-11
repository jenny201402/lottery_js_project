/**
 * Created by Administrator on 2018/6/8 0008.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "message.list",
            page: '0',
            rows: '10',
            messageList: [],
            showDetail: function (el) {
                floatw=plus.webview.create(
                    "dialog.html",
                    "message.dialog",
                    {width:'90%',height:'320px',margin:"auto",background:"rgba(0,0,0,0.4)",scrollIndicator:'none',scalable:false,popGesture:'none'},
                    {
                        el: el
                    }
                )
                floatw.addEventListener("loaded",function(){
                    floatw.show('fade-in',300)
                    floatw=null
                },false)
                //mui.confirm(el.content,el.title,['取消','确定'])
            },
            $skipArray: ['showDetail']
        })
        avalon.nextTick(function () {
            avalon.scan()
        })

        function getList(){
            $.ajax({
                type: 'get',
                url:setAction('base','getNotices'),
                data: {
                    page: vmodel.page,
                    rows: vmodel.rows
                },
                showLoader: vmodel.page === '1',
                success: function (data) {
                    if(data.code == '0'){
                        var arr = vmodel.messageList.$model.concat([])
                        vmodel.messageList = arr.concat(data.data.data)
                    }
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(vmodel.messageList.length >= data.data.totalCount)
                }
            })
        }
        mui.init({
            swipeBack: false,
            pullRefresh: {
                height:50,
                container: '#pullrefresh',
                up: {
                    contentrefresh: '正在加载数据...',
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
    });
})()