/**
 * Created by Administrator on 2018/6/11 0011.
 * 拓展方法
 */

/*删除数组指定元素*/
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i
    }
    return -1
}
Array.prototype.remove = function(val) {
    var index = this.indexOf(val)
    if (index > -1) {
        this.splice(index, 1)
    }
}

//删除数组中的指定对象
Array.prototype.removeObj = function (obj) {
    for(var i=0; i<this.length; i++ ){
        if(this[i].id == obj.id){
            this.splice(i,1)
        }
    }
}

avalon.filters.countdown = function(time, showDay) {
    var ss = Math.floor(time / 1000)
    var day = Math.floor(ss / 86400)
    ss %= 86400
    var hh = Math.floor(ss / 3600)
    ss %= 3600
    var mm = Math.floor(ss / 60)
    ss %= 60
    ss = ss < 10 ? '0' + ss : ss
    mm = mm < 10 ? '0' + mm : mm
    hh = hh < 10 ? '0' + hh : hh
    day = day < 10 ? '0' + day : day
    return showDay ? (day + '天 ' + hh + ':' + mm + ':' + ss) : (hh + ':' + mm + ':' + ss)
}

//防止事件重复点击
var _clickTimer = {}
function delay_till_last(id, fn, wait) {
    if (_clickTimer[id]) {
        window.clearTimeout(_clickTimer[id])
        delete _clickTimer[id]
    }
    return _clickTimer[id] = window.setTimeout(function() {
        fn()
        delete _clickTimer[id]
    }, wait)
}












