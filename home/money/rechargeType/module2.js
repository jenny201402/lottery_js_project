/**
 * Created by Administrator on 2018/6/6 0006.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var payView,wt
        var vmodel = avalon.define({
            $id: "recharge.module2",
            Recharge_channel_id: '',//标识符
            amount: '',//充值金额
            title:'',
            rechType: '',
            pay_onlines: [],
            Recharge_channel: [],
            nowList: {},//当前选择
            payMessage: '',
            getName: function (index) {//获取下拉框option
                var _index = index-0+1
                console.log(vmodel.pay_onlines[index].rechName)
                return vmodel.pay_onlines[index].rechName + _index
            },
            sureSubmit: function (t) {
                sureSubmitHandler(t)
            },
            $skipArray: ['getName','sureSubmit']
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        vmodel.$watch('Recharge_channel_id', function (a,b) {
            avalon.each(vmodel.Recharge_channel, function (index,item) {
                if(item.Recharge_channel_id == a){
                    vmodel.nowList = vmodel.pay_onlines[index]
                    return
                }
            })
        })

        //提交
        function sureSubmitHandler(t){
            document.activeElement.blur()
            var zz = /^[1-9]\d*$/
            if(!zz.test(vmodel.amount)){
                mui.toast('充值金额为正整数')
                return
            }
            setTimeout(function(){
                mui(t).button('loading')
            },100)
            $.ajax({
                type: 'post',
                url: setAction('user','onlinePay'),
                data: {
                    rechId: vmodel.Recharge_channel_id,
                    amount: vmodel.amount
                },
                showLoader: false,
                success: function (data) {
                    wt = plus.nativeUI.showWaiting('加载中')
                    payView = plus.webview.create(data.data.url, "payView", {
                        top: "44px",
                        bottom: 0
                    })
                    _self.append(payView)
                    payView.addEventListener('loaded',function(){
                        wt.close()
                    })
                },
                complete: function () {
                    mui(t).button('reset')
                },
                error: function(a){
                   console.log(JSON.stringify(a))
                }
            })
        }
        plus.webview.show("recharge.module2", "slide-in-right", 300, function() {
            //console.log(JSON.stringify(_self.el))
            vmodel.title = _self.el.name
            vmodel.rechType = _self.el.rechType
            vmodel.pay_onlines = _self.el.pay_online
            vmodel.Recharge_channel = _self.el.pay_type
            vmodel.Recharge_channel_id =vmodel.Recharge_channel[0].Recharge_channel_id
        })
    })
})