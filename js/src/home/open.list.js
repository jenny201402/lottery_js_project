/**
 * Created by Administrator on 2018/6/5 0005.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var timer
        var timerAll
        var vmodel = avalon.define({
            $id: "open.list",
            showView: false,
            openResults: [],
            rendered: function() {
                timer && clearInterval(timer)
                timer = null
                timer = setInterval(function() {
                    vmodel.openResults.forEach(function(item) {
                        item.time = item.time - 1000
                    })
                }, 1000)
            },
            countdown: function (id,time) {
                var _t = ''
                if(time > 0){
                    _t = avalon.filters.countdown(time)
                }else if(time == 0){
                    _t = '获取下一期'
                }else{
                    _t = '获取下一期'
                }
                return _t
            },
            openDetail: function (name,id) {
                delay_till_last('click', function() {//注意 id 是唯一的
                    plus.webview.create('../home/open.list.detail.html', 'open.list.detail', {
                        bounce: 'none',
                        'popGesture':'close'
                    },{
                        name: name,
                        gameId: id
                    })
                }, 500);
            },
            addValue: function (arr) {//蛋蛋求和值
                var v = 0
                avalon.each(arr, function (index,item) {
                    v += Number(item)
                })
                return v
            },
            showName: function (id) {
                var name = ''
                switch (id){
                    case '80' :
                        name =  '秒速赛车'
                        break
                    case '50' :
                        name =   '北京赛车'
                        break
                    case '82' :
                        name =   '秒速飞艇'
                        break
                    case '81' :
                        name =   '秒速时时彩'
                        break
                    case '1' :
                        name =   '重庆时时彩'
                        break
                    case '70' :
                        name =   '香港六合彩'
                        break
                    case '66' :
                        name =   'PC蛋蛋'
                        break
                    case '65' :
                        name =   '北京快乐8'
                        break
                    case '99' :
                        name =   '跑马'
                        break
                    case '90' :
                        name =   'PK10牛牛'
                        break
                    case '91' :
                        name =   '秒速牛牛'
                        break
                    case '10' :
                        name =  '江苏快3'
                        break
                    case '11' :
                        name =  '北京快3'
                        break
                    case '12' :
                        name =  '广西快3'
                        break
                    case '13' :
                        name =  '湖北快3'
                }
                return name
            },
            scSm: function (arr) {//赛车双面
                var r1, r2, r3,r4, r5, r6, r7, r8
                r1 = Number(arr[0]) + Number(arr[1])
                r2 = r1 > 11 ? '大' : '小'
                r3 = r1%2==0 ? '双' : '单'
                r4 = arr[0] - arr[9] > 0 ? '龙' : '虎'
                r5 = arr[1] - arr[8] > 0 ? '龙' : '虎'
                r6 = arr[2] - arr[7] > 0 ? '龙' : '虎'
                r7 = arr[3] - arr[6] > 0 ? '龙' : '虎'
                r8 = arr[4] - arr[5] > 0 ? '龙' : '虎'
                var smResult = [r1,r2,r3,r4,r5,r6,r7,r8]
                return smResult
            },
            sscSm: function (arr) {//时时彩双面
                var r1, r2, r3,r4
                r1 = Number(arr[0]) + Number(arr[1]) + Number(arr[2]) + Number(arr[3]) + Number(arr[4])
                r2 = r1 > 23 ? '大' : '小'
                r3 = r1%2==0 ? '双' : '单'
                r4 = arr[0] - arr[4] > 0 ? '龙' : '虎'
                var smResult = [r1,r2,r3,r4]
                return smResult
            },
            ddSm: function (arr) {//蛋蛋双面
                var r1, r2, r3
                r1 = Number(arr[0]) + Number(arr[1]) + Number(arr[2])
                r2 = r1 > 13 ? '大' : '小'
                r3 = r1%2==0 ? '双' : '单'
                var smResult = [r1,r2,r3]
                return smResult
            },
            getNn: function (num) {//计算牛几
                num = Number(num)
                switch (num){
                    case 1 :
                        return '牛丁'
                        break
                    case 2 :
                        return '牛二'
                        break
                    case 3 :
                        return '牛三'
                        break
                    case 4 :
                        return '牛四'
                        break
                    case 5 :
                        return '牛五'
                        break
                    case 6 :
                        return '牛六'
                        break
                    case 7 :
                        return '牛七'
                        break
                    case 8 :
                        return '牛八'
                        break
                    case 9 :
                        return '牛九'
                        break
                    case 10 :
                        return '牛牛'
                        break
                    default :
                        return '无牛'
                }
            },
            ksSm: function(arr){
                var r1, r2
                r1 = Number(arr[0]) + Number(arr[1]) + Number(arr[2])
                r2 = r1 > 10 ? '大' : '小'
                var smResult = [r1,r2]
                return smResult
            },
            $skipArray: ['getNn','ddSm','sscSm','scSm','rendered','countdown','openDetail','addValue','showName','ksSm']
        })

        function getData(a){
            $.ajax({
                type: 'get',
                url:setAction('lottery','getAllNextIssue',true),
                showLoader: a == 1|| a==2 ? false : true,
                success: function (res) {
                    vmodel.openResults = res.data
                    mergeData(res.data)
                    vmodel.showView = true
                    setInt()
                },
                complete: function(){
                    if(a == 2){
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh()
                        mui.toast('刷新成功')
                    }
                }
            })
        }
        getData()
        //重组数据
        function mergeData(data){
            vmodel.openResults = []
            avalon.each(data,function (index,item) {
                var _servertime = item.lotteryTime.split(' ')[0]+' '+item.serverTime[0]+':'+item.serverTime[1]+':'+item.serverTime[2]
                var obj = item
                obj.lotteryId = index
                obj.time = Date.parse(new Date(item.lotteryTime.replace(/-/g, '/')))-Date.parse(new Date(_servertime.replace(/-/g, '/')))
                vmodel.openResults.push(obj)
            })
        }
       function setInt(){
           timerAll && clearInterval(timerAll)
           timerAll = null
           timerAll = setInterval(function () {
               getData(1)
           },5000)
       }
        avalon.nextTick(function () {
            avalon.scan()
        })
        mui.init({
         swipeBack: false,
         pullRefresh: {
         container: '#pullrefresh',
         down: {
             contentrefresh: '正在加载...',
             contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
             contentover : "释放立即刷新" ,//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
             callback: pulldownRefresh
            }
            }
         });
        /**
         * 下拉刷新具体业务实现
         */
        function pulldownRefresh() {
            getData(2)
        }
    });
})()