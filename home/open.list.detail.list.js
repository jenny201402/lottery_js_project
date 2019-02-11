/**
 * Created by Administrator on 2018/6/8 0008.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "open.list.detail.list",
            gameId: self.gameId,
            time: self.time,
            page: '1',
            rows: '20',
            resultList: [],
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
            k3Sm:function(arr){//快3双面
                var r1,r2
                r1 = Number(arr[0]) + Number(arr[1]) + Number(arr[2])
                r2 = r1 > 10 ? '大' : '小'
                var smResult = [r1,r2]
                return smResult
            },
            addValue: function (arr) {//蛋蛋求和值
                var v = 0
                avalon.each(arr, function (index,item) {
                    v += Number(item)
                })
                return v
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
            $skipArray: ['getNn','scSm','sscSm','ddSm','addValue']
        })
        avalon.nextTick(function () {
            avalon.scan()
        })

        function  getList(a){
            $.ajax({
                type: 'get',
                url: setAction('lottery','lotteryHistory'),
                data: {
                    gameId: vmodel.gameId,
                    page: vmodel.page,
                    rows: vmodel.rows,
                    date: vmodel.time
                },
                showLoader: a == 1 ? true : false,
                success: function(data){
                    if(data.code == '0'){
                        console.log(JSON.stringify(data))
                        var arr = vmodel.resultList.$model.concat([])
                        vmodel.resultList = arr.concat(data.data)
                    }
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(vmodel.resultList.length >= data.total_count)
                },
                complete: function(){

                }
            })
        }
        window.addEventListener('update.list', function (e) {
            vmodel.gameId = e.detail.gameId
            vmodel.time = e.detail.time
            vmodel.resultList = []
            vmodel.page = 1
            getList(1)
        })
        mui.init({
            swipeBack: false,
            pullRefresh: {
                height:50,
                container: '#pullrefresh',
                up: {
                    contentrefresh: '正在加载...',
                    contentnomore: '暂无更多数据',
                    auto:true,
                    callback: function () {
                        setTimeout(function () {
                            getList()
                            vmodel.page++
                        },1000)
                    }
                }
            }
        })
    })
})()