/**
 * Created by Administrator on 2018/6/5 0005.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "open.list.detail",
            title: '',
            gameId: self.gameId,
            time: getDates()[0].id,
            lottery: [],
            dateList: [],
            $skipArray: []
        })
        avalon.nextTick(function () {
            avalon.scan()
        })
        //获取最近七天日期
        function getDates(){
            var myDate = new Date()//获取今天日期
            myDate.setDate(myDate.getDate() - 6)
            var dateArray = []
            var dateTemp,id
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
                id = myDate.getFullYear() +""+ m +""+ d
                dateArray.push({
                    id: id,
                    val: dateTemp
                })
                myDate.setDate(myDate.getDate() + flag)
            }
            return dateArray.reverse()
        }
        
        //监听彩种变化
        vmodel.$watch('gameId', function (a,b) {
            mui.fire(plus.webview.getWebviewById('open.list.detail.list'),'update.list',{
                gameId: vmodel.gameId,
                time: vmodel.time
            })
        })
        //监听时间
        vmodel.$watch('time', function (a,b) {
            mui.fire(plus.webview.getWebviewById('open.list.detail.list'),'update.list',{
                gameId: vmodel.gameId,
                time: vmodel.time
            })
        })
        mui.init({
            subpages:[{
                url:'../home/open.list.detail.list.html',//下拉刷新内容页面地址
                id:'open.list.detail.list',//内容页面标志
                styles:{
                    top:'145px',//104
                    bottom:'0'
                },
                extras:{
                    gameId: vmodel.gameId,
                    time: vmodel.time
                }
            }]
        })
        plus.webview.show("open.list.detail", "slide-in-right", 300, function() {
            vmodel.title = self.name
            vmodel.lottery = gameName()
            vmodel.dateList = getDates()
        })
    })
})()