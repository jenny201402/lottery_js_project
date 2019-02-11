/**
 * Created by Administrator on 2018/6/6 0006.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "recharge.module1",
            title:'',
            rechType: '',//充值方式
            alipaysm: '',//支付宝转账付款说明
            pay_onlines: {},
            nextHandler: function () {
                delay_till_last('click', function() {
                    plus.webview.create('offline.module.html', 'offline.module', {
                        bounce: 'none',
                        'popGesture':'close'
                    },{
                        title: vmodel.title,
                        authCode: vmodel.alipaysm,
                        el: vmodel.pay_onlines
                    })
                    setTimeout(function () {
                        _self.close('none')
                    },500)
                }, 500)
            },
            $skipArray: ['nextHandler']
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        function getSn(){
            //获取支付宝转账付款说明
            $.ajax({
                type: 'get',
                url:setAction('user','getAuthCode'),
                data:{
                    cfgId: vmodel.pay_onlines.id,
                },
                success: function (data) {
                    vmodel.alipaysm = data.result
                }
            })
        }
        plus.webview.show("recharge.module1", "slide-in-right", 300, function() {
            vmodel.title = _self.el.name
            vmodel.rechType = _self.el.rechType
            vmodel.pay_onlines = _self.el.pay_online[0]
            //判断支付宝转账
            if(vmodel.pay_onlines.rechType == 'alipay'){
                getSn()
            }
            console.log(JSON.stringify(vmodel.pay_onlines))
        })
    })
})