/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "record.road",
            gameId: '',
            name: '',
            activeTop: '',
            listTop: {},
            resultListTop: [],
            activeBottom: '',
            listBottom: [],
            showListBottom: [],
            resultListBottom: [],
            index: 0,
            arr: [],
            chooseTypeTop: function (key) {
                vmodel.activeTop = key
            },
            chooseTypeBottom: function (key) {
                vmodel.activeBottom = key
            },
            refresh: function () {//刷新
                getList()
            },
            $skipArray: ['chooseTypeTop','chooseTypeBottom','refresh']
        })
        function getList(){
            $.ajax({
                type: 'get',
                url:setAction('lottery','road')+vmodel.gameId+'stat_game_mobile.json',
                success: function (data) {
                    vmodel.listTop = data.line_down1
                    vmodel.listBottom = data.line_down2
                    avalon.each(vmodel.listTop, function (key,val) {
                        vmodel.activeTop = key
                        return false
                    })
                }
            })
        }
        avalon.nextTick(function() {
            avalon.scan()
        })
        //重组数据
        function mergeData(key){
            vmodel.arr = []
            switch (key)
            {
                case 'GJ':
                    vmodel.arr = ['GJ','GJDX','GJDS','GYH','GYHDX','GYHDS']
                    break
                case 'YJ':
                    vmodel.arr = ['YJ','YJDX','YJDS','GYH','GYHDX','GYHDS']
                    break
                case 'TSM':
                    vmodel.arr = ['TSM','TSMDX','TSMDS','GYH','GYHDX','GYHDS']
                    break
                case 'TSIM':
                    vmodel.arr = ['TSIM','TSIMDX','TSIMDS','GYH','GYHDX','GYHDS']
                    break
                case 'TWM':
                    vmodel.arr = ['TWM','TWMDX','TWMDS','GYH','GYHDX','GYHDS']
                    break
                case 'DLM':
                    vmodel.arr = ['DLM','DLMDX','DLMDS','GYH','GYHDX','GYHDS']
                    break
                case 'DQM':
                    vmodel.arr = ['DQM','DQMDX','DQMDS','GYH','GYHDX','GYHDS']
                    break
                case 'DBM':
                    vmodel.arr = ['DBM','DBMDX','DBMDS','GYH','GYHDX','GYHDS']
                    break
                case 'DJM':
                    vmodel.arr = ['DJM','DJMDX','DJMDS','GYH','GYHDX','GYHDS']
                    break
                case 'DSHIM':
                    vmodel.arr = ['DSHIM','DSHIMDX','DSHIMDS','GYH','GYHDX','GYHDS']
                    break
            }
            vmodel.showListBottom = []
            avalon.each(vmodel.arr, function (index,item) {
                avalon.each(vmodel.listBottom,function(i,list){
                    if(item == list.name){
                        vmodel.showListBottom.push(list)
                    }
                })
            })
            vmodel.activeBottom = vmodel.arr[vmodel.index]
        }
        vmodel.$watch('activeTop', function (a,b) {
            vmodel.resultListTop = []
            vmodel.resultListTop = vmodel.listTop[a].data
            mergeData(a)
        })
        vmodel.$watch('activeBottom', function (a,b) {
            vmodel.index = vmodel.arr.indexOf(a)
            vmodel.resultListBottom = []
            avalon.each(vmodel.showListBottom, function (index,item) {
                if(a == item.name){
                    vmodel.resultListBottom = item.data
                    return
                }
            })
        })
        plus.webview.show("record.road", "slide-in-right", 300, function() {
            mui.toast(_self.gameId)
            vmodel.gameId = _self.gameId
            vmodel.name = _self.gameName
            //vmodel.lottery = gameName()
            getList()
        })
    })
})