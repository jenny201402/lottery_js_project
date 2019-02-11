/**
 * Created by Administrator on 2018/6/6 0006.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "offline.module",
            title: '',
            rechTime: '',
            username: '',//用户名
            writeNum: '',//用户输入金额
            cfgId: '',//配置id
            realName: '',//实名认证
            payeeInfo: '',//支付宝昵称
            showDetail: false,
            nowList: {},
            next: function () {
                var res = /^[+\-]?(?!0\d)\d+(\.\d+)?$/
                if(res.test(vmodel.writeNum)){
                    vmodel.showDetail = true
                }else{
                    mui.toast('请输入正确的充值金额')
                }
            },
            sureSubmit: function (t) {
                sureSubmitHandler(t)
            },
            $skipArray: ['sureSubmit','next']
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        
        //提交
        function sureSubmitHandler(t){
            mui(t).button('loading')
            $.ajax({
                type: 'post',
                url:setAction('user','offline'),
                data:{
                    cfgId: vmodel.cfgId,
                    rechMoney: vmodel.writeNum,
                    realName: vmodel.username,
                    rechTime: vmodel.rechTime,
                    authCode: vmodel.authCode
                },
                success: function (data) {
                    if(data.status == 'true'){
                        mui.fire(plus.webview.getWebviewById('home/money.home.html'), 'go.ckList')
                        mui.toast('申请成功')
                        setTimeout(function () {
                            _self.close()
                        },500)
                    }
                },
                complete: function () {
                    mui(t).button('reset')
                }
            })
        }
        plus.webview.show("offline.module", "none", 300, function() {
            vmodel.title = _self.title
            vmodel.nowList = _self.el
            vmodel.authCode = _self.authCode
            vmodel.rechTime = avalon.filters.date(+new Date(), 'yyyy-MM-dd HH:mm:ss')
            vmodel.cfgId =  _self.el.id
        })
    })
})