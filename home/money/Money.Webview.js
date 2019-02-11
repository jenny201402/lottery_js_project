/**
 * Created by Administrator on 2018/6/6 0006.
 * 资金模块子页面跳转
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var vmodel = avalon.define({
            $id: "money.type.list",
            $skipArray: ['']
        })
        mui.init({
            subpages:[{
                url:'money-ckType.html',//下拉刷新内容页面地址
                id:'money-ckType',//内容页面标志
                styles:{
                    top:'0'
                }
            }]
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
    })

})
