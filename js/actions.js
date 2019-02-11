/**
 * Created by Administrator on 2018/6/21 0021.
 * Api 配置
 */
//var CONFIG_API_URL = ' http://202.182.120.31/'
var CONFIG_API_URL = 'https://www.f5700.com/'
//var CONFIG_API_URL = 'http://45.77.242.9:8811/'
function setAction(module, method,iftoken) {
    if(!iftoken){
        var token = localStorage.getItem('token')
        $.ajaxSetup({
            data : {
                token : token,
                platform: plus.os.name
            }
        })
    }else{
        $.ajaxSetup({
            data : {
                platform: plus.os.name
            }
        })
    }
    var api = {
        // 公共接口
        base: {
            login: 'api/m/login', // 登录
            init: 'api/init',//初始化
            reg: 'api/m/reg',//注册
            logout: 'api/m/logout',//退出登录
            getMoney: 'api/user/getMoney',//获取用户余额
            guestLogin: 'api/m/guestLogin', //试玩账号
            getUserMsg: 'api/m/user/getUserMsg', //用户信息
            getNotices: 'api/m/user/getNotices',//站内信
            getBanks: 'api/m/user/getBanks',//获取银行列表
            getUserBank: 'api/m/user/getUserBank',//银行卡信息
            getOtherRechCfgs: 'api/m/userrech/getOtherRechCfgs',//获取在线支付方式列表
            getRechList: 'api/mobile/user/getRechList',//获取存款记录列表
            getWithDrawList: 'api/mobile/user/getWithDrawList',//获取取款列表
        },
        // 用户行为
        user: {
            updateMyPwd: 'api/m/user/updateMyPwd', // 修改登录密码
            saveFundPwd: 'api/m/user/saveFundPwd',//设置取款密码
            updateFundPwd: 'api/m/user/updateFundPwd',//修改取款密码
            bindBank: 'api/m/user/bindBank',//绑定银行卡账号
            withdrawSubmit: 'api/m/bank/withdrawSubmit.do',//提交取款
            onlinePay: '/api/m/bank/onlinePay.pay',//线上支付
            getAuthCode: 'api/mobile/bank/getAuthCode',//获取付款说明
            offline: 'api/mobile/bank/save',//线下支付
        },
        //彩票
        lottery: {
            getHomeLotteryData: 'api/m/lottery/getHomeLotteryData', //获取热门彩种
            getAllNextIssue: 'api/m/lottery/getAllNextIssue.do',//开奖数据
            getNextIssue: 'api/m/lottery/getNextIssue.do',//彩种开奖数据
            lotteryHistory: 'api/m/lotteryHistory/data',//彩种历史开奖数据
            bet: 'api/lottery/bet.do',//下注
            getSettled: 'api/m/lottery/getSettled',//今日已结
            getNotcount: 'api/mobile/lottery/getNotcount',//即时注单
            getNotcountDetail: 'api/mobile/lottery/getNotcountDetail',//即时注单详情
            getLotteryData: 'api/lottery/getLotteryData',//即时小数据
            clong: 'mobile/static/data/clong/',//两面长龙
            road: 'mobile/static/data/',//路珠
            getStatBets: 'api/m/user/getStatBets',//下注记录
            getStatBetsDetail: 'api/m/user/getStatBetsDetail',//下注明细
        }
    }
    return CONFIG_API_URL + api[module][method]
}