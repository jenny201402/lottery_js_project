/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "record.nowBetting",
            show: false,
            list: [],
            detail: function (el) {
                if(el.totalNums > 0){
                    delay_till_last('click', function() {
                        plus.webview.create('bettingDetail.html', 'record.nowBetting.detail', {
                            bounce: 'none',
                            'popGesture':'close'
                        },{
                            name: el.name,
                            gameId: el.gameId
                        })
                    }, 500)
                }
            },
            $skipArray: ['detail']
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        function getNotcount(a){
            $.ajax({
                type:'get',
                url: setAction('lottery','getNotcount'),
                showLoader: a === 1 ? false : true,
                success: function (data) {
                    vmodel.list = [
                        {gameId: '80',name: '秒速赛车',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '50',name: '北京赛车',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '82',name: '秒速飞艇',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '81',name: '秒速时时彩',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '1',name: '重庆时时彩',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '70',name: '香港六合彩',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '66',name: 'PC蛋蛋',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '65',name: '北京快乐8',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '99',name: '跑马',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '90',name: 'PK10牛牛',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '91',name: '秒速牛牛',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '10',name: '江苏快3',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '11',name: '北京快3',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '12',name: '广西快3',totalNums: '0',totalMoney: '0.000'},
                        {gameId: '13',name: '湖北快3',totalNums: '0',totalMoney: '0.000'},
                    ]
                    avalon.each(data, function (index,item) {
                        avalon.each(vmodel.list, function (i,el) {
                            if(item.gameId == el.gameId){
                                el.totalNums = item.totalNums
                                el.totalMoney = item.totalMoney
                            }
                        })
                    })
                },
                complete: function(){
                    if(a === 1){
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh()
                    }
                    vmodel.show = true
                }
            })
        }
        plus.webview.show("record.nowBetting", "slide-in-right", 300, function() {
            getNotcount()
        })
        mui.init({
            swipeBack: false,
            pullRefresh: {
                height:50,
                container: '#pullrefresh',
                down: {
                    style:'circle',
                    callback: function(){
                        getNotcount(1)
                    }
                }
            }
        });
    })
})