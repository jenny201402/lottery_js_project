/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "my.bankcard.update",
            showView: false,
            title: '',
            bankName: '',
            cardNo: '',
            subAddress: '',
            bankInfo: {},
            bankList: [],
            placeholder: false,
            save: function (t) {
                saveBanks(t)
            },
            $skipArray: ['save']
        })
        avalon.nextTick(function() {
            avalon.scan()
        })

        //获取银行列表
        function saveBanks(t){
            mui(t).button('loading')
            $.ajax({
                type:'post',
                url: setAction('user','bindBank'),
                showLoader: false,
                data:{
                    bank_id: vmodel.bankName,
                    cardNo: vmodel.cardNo,
                    subAddress: vmodel.subAddress,
                },
                success: function(data){
                    if(data.code == 0){
                        mui.back()
                        mui.toast('操作成功')
                        mui.fire(plus.webview.getWebviewById('my.bankcard'), 'update.info')
                        mui.fire(plus.webview.getWebviewById('tab-top-subpage-2.html'), 'update.handler')
                    }
                },
                complete: function () {
                    mui(t).button('reset')
                },
                error: function (a,b,c) {

                }
            })
        }
        function getBanks(){
            $.ajax({
                type:'get',
                url: setAction('base','getBanks'),
                success: function(data){
                    if(data.code == 0){
                        vmodel.bankList = data.data
                        vmodel.showView = true
                    }
                }
            })
        }
        plus.webview.show("my.bankcard.update", "slide-in-right", 300, function() {
            vmodel.title = _self.title
            vmodel.bankInfo = _self.info
            if(_self.placeholder){
                vmodel.placeholder = true
                vmodel.bankName =  vmodel.bankInfo.bank_id
            }
            getBanks()
        })
    })
})