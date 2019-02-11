/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "record.road.kl8",
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
                    console.log(JSON.stringify(data))
                    /*var obj = {}
                    obj['QIU1'] = data.line_down1['QIU1']
                    obj['QIU2'] = data.line_down1['QIU2']
                    obj['QIU3'] = data.line_down1['QIU3']
                    obj['QIU4'] = data.line_down1['QIU4']
                    obj['QIU5'] = data.line_down1['QIU5']
                    vmodel.listTop = obj
                    vmodel.listBottom = data.line_down2
                    vmodel.activeTop = 'QIU1'*/
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
                case 'QIU1':
                    vmodel.arr = ['QIU1','QIU1DX','QIU1DS','ZHDX','ZHDS','ZHLHH']
                    break
                case 'QIU2':
                    vmodel.arr = ['QIU2','QIU2DX','QIU2DS','ZHDX','ZHDS','ZHLHH']
                    break
                case 'QIU3':
                    vmodel.arr = ['QIU3','QIU3DX','QIU3DS','ZHDX','ZHDS','ZHLHH']
                    break
                case 'QIU4':
                    vmodel.arr = ['QIU4','QIU4DX','QIU4DS','ZHDX','ZHDS','ZHLHH']
                    break
                case 'QIU5':
                    vmodel.arr = ['QIU5','QIU5DX','QIU5DS','ZHDX','ZHDS','ZHLHH']
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
        plus.webview.show("record.road.kl8", "slide-in-right", 300, function() {
            mui.toast(_self.gameId)
            vmodel.gameId = _self.gameId
            vmodel.name = _self.gameName
            getList()
        })
    })
})