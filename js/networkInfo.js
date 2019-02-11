/**
 * Created by Administrator on 2018/6/8 0008.
 * 获取当前网络状态
 *
 * 网络状态常量，表示当前设备网络状态未知，固定值为0。
 : 网络状态常量，当前设备网络未连接网络，固定值为1。
 : 网络状态常量，当前设备连接到有线网络，固定值为2。
 : 网络状态常量，当前设备连接到无线WIFI网络，固定值为3。
 : 网络状态常量，当前设备连接到蜂窝移动2G网络，固定值为4。
 : 网络状态常量，当前设备连接到蜂窝移动3G网络，固定值为5。
 : 网络状态常量，当前设备连接到蜂窝移动4G网络，固定值为6。
 */
var connectionStatus = plus.networkinfo.getCurrentType();

if(connectionStatus == 0 || connectionStatus == 1){
    mui.toast('无法连接网络,请查看网络设置');
}else if(connectionStatus == 2){
    mui.toast('使用宽带');
}else if(connectionStatus == 3){
    mui.toast('使用wifi');
}else if(connectionStatus == 4){
    mui.toast('使用2G');
}else if(connectionStatus == 5){
    mui.toast('使用3G');
}else if(connectionStatus == 6){
    mui.toast('使用4G');
}


