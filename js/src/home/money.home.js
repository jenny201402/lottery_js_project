/**
 * Created by Administrator on 2018/6/5 0005.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "money.home",
            username: '----',
            userMoney: '----',
            refresh: function () {//刷新用户余额
                getmoney()
            },
            $skipArray: ['refresh']
        })

        //获取用户余额
        function getmoney(b){
            $.ajax({
                type: 'post',
                showLoader: b,
                url: setAction('base','getMoney'),
                success: function (data) {
                    vmodel.userMoney = data
                }
            })
        }
        //初始化数据
        function initData(){
            vmodel.username = localStorage.getItem('username')
            getmoney(false)
        }
        initData()
        window.addEventListener('update.message', function () {
            initData()
        })
        avalon.nextTick(function () {
            avalon.scan()
        })
    });
})()