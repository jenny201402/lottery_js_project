/**
 * Created by Administrator on 2018/6/5 0005.
 */
(function () {
    mui.plusReady(function() {
        var self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "webview.float",
            info: {},
            type: '',
            back: function () {
                self.close()
            },
            getStatus: function (s) {
              var text = ''
                switch (s){
                    case 1:
                        text = '未受理'
                        break
                    case 2:
                        text = '充值成功'
                        break
                    case 3:
                        text = '充值失败'
                        break
                    case 4:
                        text = '在线充值中'
                        break
                }
                return text
            },
            getStatus2: function (s) {
                var text = ''
                switch (s){
                    case 0:
                        text = '未受理'
                        break
                    case 2:
                        text = '取款成功'
                        break
                    case 3:
                        text = '取款失败'
                        break
                }
                return text
            },
            rechType: function (type) {
                var t = ''
                switch (type){
                    case 'WY':
                        t = '网银在线支付'
                        break
                    case 'bankTransfer':
                        t = '银行卡转账'
                        break
                    case 'ZFB':
                        t = '支付宝在线支付'
                        break
                    case 'WX':
                        t = '微信在线支付'
                        break
                    case 'QQ':
                        t = 'QQ在线支付'
                        break
                    case 'XYK':
                        t = '信用卡在线支付'
                        break
                    case 'alipay':
                        t = '支付宝转账'
                        break
                    case 'weixin':
                        t = '微信转账'
                        break
                    case 'cft':
                        t = '财付通转账'
                        break
                    case 'YL':
                        t = '银联快捷(扫码)'
                        break
                    case 'JD':
                        t = '京东钱包'
                        break
                    case 'BD':
                        t = '百度钱包'
                        break
                    case 'onlinePayment':
                        t = '在线充值'
                        break
                }
                return t
            },
            $skipArray: ['back','getStatus','getStatus2','rechType']
        })
        vmodel.info = self.el
        vmodel.type = self.type
        avalon.nextTick(function () {
            avalon.scan()
        })
    })
})()