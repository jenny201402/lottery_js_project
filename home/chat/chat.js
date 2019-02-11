/**
 * Created by Administrator on 2018/6/7 0007.
 */
$(function() {
    mui.plusReady(function() {
        var _self = plus.webview.currentWebview()
        var imageViewer = new mui.ImageViewer('.msg-content-image', {
            dbl: false
        })
        var ws = new WebSocket('ws://45.77.242.9:9500');
        ws.onopen = function () {
            console.log('ws onopen');
            ws.send('from client: hello');
        };
        ws.onmessage = function (e) {
            console.log('ws onmessage');
            console.log('from server: ' + e.data);
        };
        var vmodel = avalon.define({
            $id: "base.chat",
            sendImg: function () {
                    var btnArray = [{
                        title: "拍照"
                    }, {
                        title: "从相册选择"
                    }]
                    plus.nativeUI.actionSheet({
                        title: "选择照片",
                        cancel: "取消",
                        buttons: btnArray
                    }, function(e) {
                        var index = e.index
                        switch (index) {
                            case 0:
                                break
                            case 1:
                                var cmr = plus.camera.getCamera()
                                cmr.captureImage(function(path) {
                                    console.log("file://" + plus.io.convertLocalFileSystemURL(path))
                                    vmodel.messageList.push(
                                        {
                                            owner: true,
                                            type: 'img',
                                            src: "file://" + plus.io.convertLocalFileSystemURL(path)
                                        }
                                    )
                                    imageViewer.findAllImage()
                                    console.log(JSON.stringify(imageViewer))
                                }, function(err) {})
                                break
                            case 2:
                                plus.gallery.pick(function(path) {
                                    console.log("file://" + plus.io.convertLocalFileSystemURL(path))
                                    vmodel.messageList.push(
                                        {
                                            owner: true,
                                            type: 'img',
                                            src: "file://" + plus.io.convertLocalFileSystemURL(path)
                                        }
                                    )
                                    imageViewer.findAllImage()
                                    console.log(JSON.stringify(imageViewer))
                                }, function(err) {}, null)
                                break
                        }
                }, false)
            },
            text: '',
            messageList:[
                {
                    owner: false,
                    type: 'text',
                    content: '我是帅哥'
                }
            ],
            sendMessage: function () {//发送消息
                vmodel.messageList.push(
                    {
                        owner: true,
                        type: 'text',
                        content: vmodel.text
                    }
                )
                vmodel.text = ''
                vmodel.hideKeyword()
            },
            hideKeyword: function () {//隐藏键盘
                document.activeElement.blur()
            },
            $skipArray: ['sendImg','sendMessage','hideKeyword']
        })
        avalon.nextTick(function() {
            avalon.scan()
        })
        plus.webview.show("base.chat", "slide-in-right", 300, function() {
        })
    })
})