/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "my.bankcard",
            showView: false,
            bankInfo: {},
            hasBind: '1',
            openUpdateModule: function () {
                delay_till_last('click', function() {
                    plus.webview.create('bankcard-update.html', 'my.bankcard.update', {
                        bounce: 'none',
                        'popGesture':'close'
                    },{
                        title: '修改银行卡',
                        info : vmodel.bankInfo,
                        placeholder: true
                    })
                }, 500)
            },
            openAddModule: function () {
                delay_till_last('click', function() {
                    plus.webview.create('bankcard-update.html', 'my.bankcard.update', {
                        bounce: 'none',
                        'popGesture':'close'
                    },{
                        title: '添加银行卡',
                        info : vmodel.bankInfo
                    })
                }, 500)
            },
            $skipArray: ['openUpdateModule','openAddModule']
        })
        avalon.nextTick(function() {
            avalon.scan()
        })

        function getBankcard(){
            $.ajax({
                type: 'get',
                url:setAction('base','getUserBank'),
                success: function (data) {
                    if(data.code == '0'){
                        if(data.data.bankName == null && data.data.subAddress == null){
                            vmodel.hasBind = '0'
                        }else{
                            vmodel.hasBind = '1'
                        }
                        vmodel.bankInfo = data.data
                        vmodel.showView = true
                    }
                }
            })
        }
        getBankcard()
        //监听修改银行卡信息
        window.addEventListener('update.info', function () {
            vmodel.showView = false
            getBankcard()
        })
        plus.webview.show("my.bankcard", "slide-in-right", 300, function() {

        })
    })
})