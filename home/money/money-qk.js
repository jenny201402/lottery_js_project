/**
 * Created by Administrator on 2018/6/5 0005.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "tab-top-subpage-2.html",
            showView: false,
            hasBind: '',
            amount: '',
            fundPwd: '',
            bankInfo: {},
            bindBank: function () {
                delay_till_last('click', function() {
                    plus.webview.create('../my/bankcard/bankcard-update.html', 'my.bankcard.update', {
                        bounce: 'none',
                        'popGesture':'close'
                    },{
                        title: '添加银行卡',
                        info : vmodel.bankInfo,
                    })
                }, 500)
            },
            sure: function (t) {
                sureHandler(t)
            },
            $skipArray: ['bindBank','sure']
        })

        //获取银行卡信息
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
        //确认提款
        function sureHandler(t){
            if(vmodel.amount == ''){
                mui.toast('请输入提款金额')
                return
            }
            if(vmodel.fundPwd == ''){
                mui.toast('请输入提款密码')
                return
            }
            mui(t).button('loading')
            $.ajax({
                type: 'post',
                url:setAction('user','withdrawSubmit'),
                showLoader: false,
                data:{
                    amount: vmodel.amount,
                    fundPwd: md5(vmodel.fundPwd),
                    fundPwdText:vmodel.fundPwd,
                },
                success: function (data) {
                    if(data.code == 0){
                        mui.toast('发起提款成功')
                        vmodel.amount = ''
                        vmodel.fundPwd = ''
                        mui.fire(plus.webview.getWebviewById('home/money.home.html'), 'go.qkList')
                    }
                },
                complete: function (e) {
                    mui(t).button('reset')
                },
                error: function(a,b,c){
                }
            })
        }
        getBankcard()

        window.addEventListener('update.handler', function () {
            vmodel.amount = ''
            vmodel.fundPwd = ''
            getBankcard()
        })
        avalon.nextTick(function () {
            avalon.scan()
        })
    })
})()