/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "record.nowBetting.detail",
            lotteryName: '----',
            show: false,
            gameId: '',
            list: [],
            info: {},
            rows: '100',
            gameMap: {},
            plays: {},
            playCates: {},
            $skipArray: []
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        function getList(id){
            $.ajax({
                type:'get',
                url: setAction('lottery','getNotcountDetail'),
                data:{
                    gameId: id,
                    rows: vmodel.rows
                },
                success: function (data) {
                    vmodel.list = data.data
                    vmodel.info = data.otherData
                },
                complete: function(){
                    vmodel.show = true
                }
            })
        }
        plus.webview.show("record.nowBetting.detail", "slide-in-right", 300, function() {
            vmodel.lotteryName = _self.name
            vmodel.gameId = _self.gameId
            vmodel.gameMap = gameMap //彩种名称
            vmodel.plays = plays //小项
            vmodel.playCates = playCates //玩法
            getList(vmodel.gameId)
        })
    })
})