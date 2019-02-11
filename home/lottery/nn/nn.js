/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var fptimer,kjtimer,againtimer
        var vmodel = avalon.define({
            $id: "base.nn",
            title: '',
            balance: '----',//用户余额
            unbalancedMoney: '',//即时注单
            winMoney: '',//今天输赢
            showMoney: false,//加载显示
            showModule: false,
            viewActive: '0',
            iffp: false,
            menuView: false,//头部菜单
            fptime:'--:--',//封盘倒计时
            kjtime:'--:--',//开奖倒计时
            preIssue: '----',//上期期号
            issue: '----',//当前期号
            preNum: [],//开奖结果
            n11:'',//庄 点数
            n12:'',//闲一 点数
            n13:'',//闲二 点数
            n14:'',//闲三 点数
            n15:'',//闲四 点数
            n16:'',//闲五 点数
            banker: '',//庄家号码
            player1: '',//闲一号码
            player2: '',//闲二号码
            player3: '',//闲三号码
            player4: '',//闲四号码
            player5: '',//闲五号码
            winArr: {banker:{win: false},player1:{win: false},player2:{win: false},player3:{win: false},player4:{win: false},player5:{win: false}},//开奖输赢
            serverTime: '',//服务器时间
            endTime: '',//封盘时间
            lotteryTime: '',//开奖时间
            type: '',//玩法
            bettingMoney: '',//投注金额
            totalMoney: 0,//投注总金额
            lotteryID: '',//彩种id
            sscMethodConfig:{},//所有彩种配置
            configList:{},//当前彩种配置
            methodsList: [],//玩法配置
            bettingArr: [],//注单数据
            bettingListDetail: [],//注单详情
            oddsList: {},//赔率信息
            detailDialog: false,//注单详情显示
            choumaShow: false,//筹码显示
            chooseType: function (type) {
                vmodel.type = type
            },
            chooseHandler: function (item,title,odds) {
                item.checked = !item.checked
                bettingArrHandler(item,title,odds)
            },
            resetBettingChoose: function (){//重置
                resetBettingChooseHandler(vmodel.methodsList)
            },
            betting: function () {
                bettingHandler()
            },
            cancelDialog: function () {//取消投注详情显示
                vmodel.bettingListDetail = []
                vmodel.detailDialog = false
                vmodel.totalMoney = 0
            },
            chooseMoney: function (num) {//选择筹码
                vmodel.bettingMoney= vmodel.bettingMoney -0 +Number(num)
                vmodel.choumaShow = false
            },
            clearMoney: function () {//清除金额
                vmodel.bettingMoney = ''
                vmodel.choumaShow = false
            },
            showChouma: function () {//显示筹码
                vmodel.choumaShow = !vmodel.choumaShow
            },
            getOdds: function (id) {//获取赔率
                return vmodel.oddsList[id]
            },
            sureBetting: function () {//确认投注
                sureBettingHandler()
            },
            changeView: function (n) {//打开聊天窗口
                changeViewHandler(n)
            },
            menuViewHandler: function () {
                vmodel.menuView = false
            },
            menuList: function () {//菜单
                if(!vmodel.menuView){
                    getLotteryData()
                }
                vmodel.menuView = !vmodel.menuView
            },
            nowBetting: function () {//即时注单
                delay_till_last('click', function() {
                    plus.webview.create('../../lotteryRecord/nowBetting/nowBetting.html', 'record.nowBetting', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500)
            },
            todayFinish: function () {//今日已结
                delay_till_last('click', function() {
                    plus.webview.create('../../my/todays/todays.html', 'my.todays', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500)
            },
            bettingList: function () {//下注记录
                delay_till_last('click', function() {
                    plus.webview.create('../../my/betting/betting.html', 'my.betting', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500)
            },
            openResult: function () {//开奖结果
                delay_till_last('click', function() {
                    plus.webview.create('../../open.list.detail.html', 'open.list.detail', {
                        bounce: 'none',
                        'popGesture':'close'
                    },{
                        name: vmodel.title,
                        gameId: vmodel.lotteryID
                    })
                }, 500)
            },
            gamaRules: function () {//游戏规则
                delay_till_last('click', function() {
                    plus.webview.create('../../lotteryRecord/gamaRules/gamaRules.html', 'record.gamaRules', {
                        bounce: 'none',
                        'popGesture':'close',
                    },{
                        name: vmodel.title,
                        gameId: vmodel.lotteryID
                    })
                }, 500)
            },
            towFace: function () {//两面长龙
                delay_till_last('click', function() {
                    plus.webview.create('../../lotteryRecord/towFace/towFace.html', 'record.towFace', {
                        bounce: 'none',
                        'popGesture':'close'
                    },{
                        gameId: vmodel.lotteryID
                    })
                }, 500)
            },
            road: function () {//路珠
                delay_till_last('click', function() {
                    plus.webview.create('../../lotteryRecord/road/kl8road.html', 'record.road.pcdd', {
                        bounce: 'none',
                        'popGesture':'close'
                    },{
                        gameId: vmodel.lotteryID,
                        gameName: vmodel.title
                    })
                }, 500)
            },
            winLose: function () {//今天输赢
                delay_till_last('click', function() {
                    plus.webview.create('../../my/todays/todays.html', 'my.todays', {
                        bounce: 'none',
                        'popGesture':'close'
                    })
                }, 500)
            },
            getNn: function (num) {//计算牛几
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
            moneyHandler: function (d) {
                mui.fire(plus.webview.getWebviewById('app.index'), 'change.tab')
                mui.fire(plus.webview.getWebviewById('home/money.home.html'), 'go.'+d)
                plus.webview.close(_self)
            },
            $skipArray: ['moneyHandler','getNn','menuViewHandler','winLose','road','towFace','gamaRules','openResult','bettingList','todayFinish','nowBetting','chooseType','chooseHandler','resetBettingChoose','betting','cancelDialog','chooseMoney','clearMoney','showChouma','getOdds','changeView','menuList']
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        //遍历对应彩种配置
        function lotteryConfig(id){
            var arr = []
            avalon.each(vmodel.sscMethodConfig,function (index,item) {
                if(index === id){
                    arr = item
                    return
                }
            })
            return arr
        }

        //遍历玩法对应配置
        function methosdConfig(type){
            resetBettingChooseHandler(vmodel.methodsList)
            vmodel.methodsList = []
            avalon.each(vmodel.configList,function (index,item) {
                if(index === type){
                    vmodel.methodsList = item.methods
                    return false
                }
            })
        }

        //注单数组重构
        function bettingArrHandler(item,title,odds){
            var obj = {
                id: item.id,
                title: title,
                odds: odds,
                name: item.title,
            }
            if(item.checked){
                vmodel.bettingArr.push(obj)
            }else{
                vmodel.bettingArr.removeObj(obj)
            }
        }
        //投注
        function bettingHandler(){
            if(vmodel.bettingArr.length < 1){
                mui.toast('请选择投注内容')
                return
            }
            if(vmodel.bettingMoney == '' || vmodel.bettingMoney == 0){
                mui.toast('请输入投注金额')
                return
            }
            vmodel.bettingListDetail = vmodel.bettingArr
            vmodel.detailDialog = true
            vmodel.totalMoney =Number(vmodel.bettingMoney) * vmodel.bettingArr.length
        }
        //重置注单选择
        function resetBettingChooseHandler(arr){
            avalon.each(arr, function (index,item) {
                avalon.each(item.type, function (i,t) {
                    t.checked = false
                })
            })
            vmodel.bettingArr = []
        }

        //获取游戏详细数据
        function getNextIssue(id,loader){
            $.ajax({
                type: 'get',
                url:'https://f5711.com/api/lottery/getNextIssue.do',
                showLoader: loader,
                data:{
                    gameId: id
                },
                success: function (data) {
                    if(data.status === '1'){
                        vmodel.preIssue = data.preIssue
                        vmodel.issue = data.issue
                        vmodel.preNum = data.preNum.split(',')
                        vmodel.serverTime = data.serverTime.replace(/-/g,'/')
                        vmodel.endTime = Date.parse(new Date(data.endTime.replace(/-/g, '/')))-Date.parse(new Date(data.serverTime.replace(/-/g, '/')))
                        vmodel.lotteryTime = Date.parse(new Date(data.lotteryTime.replace(/-/g, '/')))-Date.parse(new Date(data.serverTime.replace(/-/g, '/')))
                        vmodel.n11 = data.n11
                        vmodel.n12 = data.n12
                        vmodel.n13 = data.n13
                        vmodel.n14 = data.n14
                        vmodel.n15 = data.n15
                        vmodel.n16 = data.n16
                        vmodel.banker = data.banker
                        vmodel.player1 = data.player1
                        vmodel.player2 = data.player2
                        vmodel.player3 = data.player3
                        vmodel.player4 = data.player4
                        vmodel.player5 = data.player5
                        countTime()
                        winHandler()
                        vmodel.showModule = true
                        if(vmodel.issue - vmodel.preIssue != 1){
                            getDataAgain()
                        }else{
                            clearInterval(againtimer)
                        }
                    }else{
                        mui.toast('获取游戏数据失败')
                    }
                }
            })
        }
        //轮训请求官方开奖结果
        function getDataAgain(){
            againtimer = setInterval(function(){
                getNextIssue(vmodel.lotteryID,false)
            },5000)
        }
        //获取赔率
        function getOddsData(id,obj){
            var _o = {}
            for( var i in obj){
                if(obj[i].gameId == id){
                    _o[obj[i].id] = obj[i].odds
                }
            }
            vmodel.oddsList = _o
        }

        //投注
        function sureBettingHandler(){
            var data = {
                "gameId": vmodel.lotteryID,
                "turnNum": vmodel.issue,
                "totalNums": vmodel.bettingListDetail.length,
                "totalMoney": vmodel.totalMoney,
                "betSrc": 0
            }
            avalon.each(vmodel.bettingListDetail, function (index,item) {
                data['betBean_playId[' + index + ']'] = item.id
                data['betBean_odds[' + index + ']'] = item.odds
                data['betBean_rebate[' + index + ']'] = '0'
                data['betBean_money[' + index + ']'] = vmodel.bettingMoney
            })
            $.ajax({
                type: 'post',
                url: setAction('lottery','bet'),
                data:{
                    data: JSON.stringify(data)
                },
                success: function (data) {
                    if(data.code == 200){
                        mui.toast('投注成功')
                        resetBettingChooseHandler(vmodel.methodsList)//重置选号
                        vmodel.bettingListDetail = []//清除浮窗
                        vmodel.detailDialog = false
                        vmodel.totalMoney = 0
                        getMoney()//更新金额
                    }else{
                        mui.toast(data.msg)
                    }
                }
            })
        }

        //打开聊天窗口
        function changeViewHandler(n){
            vmodel.viewActive = n
            var view = plus.webview.getWebviewById('base.chat')
            if(n === '0'){
                if(view){
                    view.hide()
                }
            }else{
                if(view){
                    view.show()
                }else{
                    plus.webview.create('../../chat/chat.html', 'base.chat', {
                        'bottom': 0,
                        'top': '100px'
                    })
                }
            }
        }

        //获取用户余额
        function getMoney(){
            $.ajax({
                type: 'post',
                url:setAction('base','getMoney'),
                success: function (data) {
                    vmodel.balance = data
                }
            })
        }
        getMoney()
        //倒计时
        function countTime(){
            clearInterval(fptimer)
            clearInterval(kjtimer)
            vmodel.iffp = false
            if(vmodel.endTime > 0){
                vmodel.fptime = avalon.filters.countdown(vmodel.endTime)
            }else{
                vmodel.fptime = '已封盘'
                vmodel.iffp = true
            }
            if(vmodel.lotteryTime > 0){
                vmodel.kjtime = avalon.filters.countdown(vmodel.lotteryTime)
            }else{
                vmodel.kjtime = '00:00:00'
            }
            fptimer = setInterval(function () {
                vmodel.endTime -= 1000
                if(vmodel.endTime > 0){
                    vmodel.fptime = avalon.filters.countdown(vmodel.endTime)
                }else{
                    vmodel.fptime = '已封盘'
                    vmodel.iffp = true
                }
            },1000)

            kjtimer = setInterval(function () {
                vmodel.lotteryTime -= 1000
                if(vmodel.lotteryTime > 0){
                    vmodel.kjtime = avalon.filters.countdown(vmodel.lotteryTime)
                }else{
                    vmodel.kjtime = '00:00:00'
                }
            },1000)

        }
        //监听玩法变化
        vmodel.$watch('type', function (a,b) {
            methosdConfig(a)
        })
        //监听封盘倒计时
        vmodel.$watch('endTime',function(a,b){
            if(a < 0){
                clearInterval(fptimer)
                vmodel.fptime = '已封盘'
                vmodel.iffp = true
                //清除已经显示的投注内容
                vmodel.bettingListDetail = []
                vmodel.detailDialog = false
                vmodel.totalMoney = 0
            }
        })
        //监听开奖倒计时
        vmodel.$watch('lotteryTime',function(a,b){
            if(a < 0){
                clearInterval(kjtimer)
                vmodel.kjtime = '00:00:00'
                getNextIssue(vmodel.lotteryID,false)
            }
        })
        //牛牛判断输赢
        function winHandler(){
            vmodel.winArr = {banker:{win: false},player1:{win: false},player2:{win: false},player3:{win: false},player4:{win: false},player5:{win: false}} //重置开奖输赢
            var z = vmodel.n11
            var x1 = vmodel.n12
            var x2 = vmodel.n13
            var x3 = vmodel.n14
            var x4 = vmodel.n15
            var x5 = vmodel.n16
            var z_n = vmodel.banker.split('')
            var z_x1 =vmodel.player1.split('')
            var z_x2 =vmodel.player2.split('')
            var z_x3 =vmodel.player3.split('')
            var z_x4 =vmodel.player4.split('')
            var z_x5 =vmodel.player5.split('')
            //庄家通杀
            if(z > x1 && z > x2 && z > x3 && z > x4 && z > x5){
                vmodel.winArr.banker.win = true
            }else if( z < 7 && z === x1 && z === x2 && z === x3 && z === x4 && z === x5){
                vmodel.winArr.banker.win = true
            }else{
                //闲一比
                if(z < x1){
                    vmodel.winArr.player1.win = true
                }else if(z === x1 && z > 6 && x1 > 6){//相等且大于牛六比较、否则庄家赢
                   avalon.each(z_n, function (index,item) {
                       if(item < z_x1[index] ){
                           vmodel.winArr.player1.win = true
                           return
                       }
                   })
                }
                //闲二比
                if(z < x2){
                    vmodel.winArr.player2.win = true
                }else if(z === x2 && z > 6 && x2 > 6){//相等且大于牛六比较、否则庄家赢
                    avalon.each(z_n, function (index,item) {
                        if(item < z_x2[index] ){
                            vmodel.winArr.player2.win = true
                            return
                        }
                    })
                }
                //闲三比
                if(z < x3){
                    vmodel.winArr.player3.win = true
                }else if(z === x3 && z > 6 && x3 > 6){//相等且大于牛六比较、否则庄家赢
                    avalon.each(z_n, function (index,item) {
                        if(item < z_x3[index] ){
                            vmodel.winArr.player3.win = true
                            return
                        }
                    })
                }
                //闲四比
                if(z < x4){
                    vmodel.winArr.player4.win = true
                }else if(z === x4 && z > 6 && x4 > 6){//相等且大于牛六比较、否则庄家赢
                    avalon.each(z_n, function (index,item) {
                        if(item < z_x4[index] ){
                            vmodel.winArr.player4.win = true
                            return
                        }
                    })
                }
                //闲五比
                if(z < x5){
                    vmodel.winArr.player5.win = true
                }else if(z === x5 && z > 6 && x5 > 6){//相等且大于牛六比较、否则庄家赢
                    avalon.each(z_n, function (index,item) {
                        if(item < z_x5[index] ){
                            vmodel.winArr.player5.win = true
                            return
                        }
                    })
                }
            }
        }
        //获取菜单小数据
        function  getLotteryData(){
            vmodel.showMoney = false
            $.ajax({
                type: 'post',
                url: setAction('lottery','getLotteryData'),
                showLoader: false,
                data: {
                    gameId : vmodel.lotteryID
                },
                success: function(data){
                    vmodel.unbalancedMoney = data.unbalancedMoney
                    vmodel.winMoney = data.winMoney
                    vmodel.showMoney = true
                }
            })
        }
        plus.webview.show("base.nn", "slide-in-right", 300, function() {
            vmodel.title = _self.name
            vmodel.lotteryID = _self.gameId
            vmodel.sscMethodConfig = sscMethodConfig()
            vmodel.configList = lotteryConfig(vmodel.lotteryID)
            getOddsData(vmodel.lotteryID,plays)
            getNextIssue(vmodel.lotteryID,true)
            for(var key in vmodel.configList){
                vmodel.type = key
                break
            }
        })
    })
})