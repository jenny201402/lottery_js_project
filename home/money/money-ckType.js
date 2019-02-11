/**
 * Created by Administrator on 2018/6/6 0006.
 * 资金模块子页面跳转
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "money-ckType",
            show: false,
            typeList: [],
            openTypeModule: function(el) {
                delay_till_last('click', function() {
                    if(el.onlineType == '1'){
                        //线上付款
                        plus.webview.create('rechargeType/module2.html', 'recharge.module2', {
                            bounce: 'none',
                            'popGesture':'close'
                        },{
                            el: el
                        })
                    }else if(el.onlineType == '0'){
                        //线下付款
                        plus.webview.create('rechargeType/module1.html', 'recharge.module1', {
                            bounce: 'none',
                            'popGesture':'close'
                        },{
                            el: el
                        })
                    }
                }, 500);
            },
            $skipArray: ['openTypeModule']
        })
        //获取在线支付列表
        function getRechargeType(){
            $.ajax({
                type: 'get',
                url:setAction('base','getOtherRechCfgs',true),
                success: function (data) {
                    if(data.code == '0'){
                        vmodel.typeList = data.rech_types
                        vmodel.show = true
                    }
                }
            })
        }
        getRechargeType()
        window.addEventListener('update.handler', function () {
            getRechargeType()
        })
        avalon.nextTick(function() {
            avalon.scan()
        })

    })

})
