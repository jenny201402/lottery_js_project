/**
 * Created by Administrator on 2018/6/8 0008.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "betting.list",
            startDate: '',
            endDate: '',
            dateList: [],
            messageList: [],
            getWeek: function (en) {
                var cn = ''
                switch (en){
                    case 'Monday' :
                        cn = '星期一'
                        break
                    case 'Tuesday' :
                        cn = '星期二'
                        break
                    case 'Wednesday' :
                        cn = '星期三'
                        break
                    case 'Thursday' :
                        cn = '星期四'
                        break
                    case 'Friday' :
                        cn = '星期五'
                        break
                    case 'Saturday' :
                        cn = '星期六'
                        break
                    case 'Sunday' :
                        cn = '星期日'
                        break
                }
                return cn
            },
            showDetail: function (date) {
                delay_till_last('click', function() {
                    plus.webview.create('bettingHistory.detail.html', 'betting.history.detail', {
                        bounce: 'none',
                        'popGesture':'close'
                    },{
                        date: date
                    })
                }, 500)
            },
            $skipArray: ['getWeek','showDetail']
        })
        avalon.nextTick(function () {
            avalon.scan()
        })

        //获取最近七天日期
        function getDates(){
            var myDate = new Date()//获取今天日期
            myDate.setDate(myDate.getDate() - 7)
            var dateArray = []
            var dateTemp
            var flag = 1
            for (var i = 0; i < 7; i++) {
                var m,d
                if(myDate.getMonth()+1 > 10){
                    m = myDate.getMonth()+1
                }else{
                    m = '0' + (myDate.getMonth()+1)
                }
                if(myDate.getDate() > 9){
                    d = myDate.getDate()
                }else{
                    d = '0' + (myDate.getDate())
                }
                dateTemp = myDate.getFullYear() + '-' + m +"-"+ d
                dateArray.push(
                    dateTemp
                )
                myDate.setDate(myDate.getDate() + flag)
            }
            return dateArray
        }
        function getList(a){
            $.ajax({
                type: 'get',
                url:setAction('lottery','getStatBets'),
                data: {
                    startDate :  vmodel.dateList[0],
                    endDate : vmodel.dateList[6]
                },
                showLoader: a == 1 ? false : true,
                success: function (data) {
                    if(data.code == 0){
                        vmodel.messageList = data.data
                        mui.fire(plus.webview.getWebviewById('my.betting'), 'betting.message',{
                            otherData: data.otherData
                        })
                    }
                },
                complete: function(){
                    if(a == 1){
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                    }
                }
            })
        }
        vmodel.dateList = getDates()
        getList()
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
    });
})()