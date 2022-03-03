const qiniuUploader = require("../../utils/qiniuUploader");
// index.js


// 初始化七牛云相关配置
function initQiniu() {
    var options = {
        // bucket所在区域，这里是华北区。ECN, SCN, NCN, NA, ASG，分别对应七牛云的：华东，华南，华北，北美，新加坡 5 个区域
        region: 'SCN',

        // 获取uptoken方法三选一即可，执行优先级为：uptoken > uptokenURL > uptokenFunc。三选一，剩下两个置空。推荐使用uptokenURL，详情请见 README.md
        // 由其他程序生成七牛云uptoken，然后直接写入uptoken
        uptoken: '',
        // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "0MLvWPnyy..."}
        uptokenURL: 'https://api.moxhub.cn//img/v1/getToken/',
        
        // uptokenFunc 这个属性的值可以是一个用来生成uptoken的函数，详情请见 README.md
        uptokenFunc: function () { 
        		// do something
    				return qiniuUploadToken;
        },

        // bucket 外链域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 fileURL 字段。否则需要自己拼接
        domain: 'https://img.moxhub.cn/',
        // qiniuShouldUseQiniuFileName 如果是 true，则文件的 key 由 qiniu 服务器分配（全局去重）。如果是 false，则文件的 key 使用微信自动生成的 filename。出于初代sdk用户升级后兼容问题的考虑，默认是 false。
        // 微信自动生成的 filename较长，导致fileURL较长。推荐使用{qiniuShouldUseQiniuFileName: true} + "通过fileURL下载文件时，自定义下载名" 的组合方式。
        // 自定义上传key 需要两个条件：1. 此处shouldUseQiniuFileName值为false。 2. 通过修改qiniuUploader.upload方法传入的options参数，可以进行自定义key。（请不要直接在sdk中修改options参数，修改方法请见demo的index.js）
        // 通过fileURL下载文件时，文件自定义下载名，请参考：七牛云“对象存储 > 产品手册 > 下载资源 > 下载设置 > 自定义资源下载名”（https://developer.qiniu.com/kodo/manual/1659/download-setting）。本sdk在README.md的"常见问题"板块中，有"通过fileURL下载文件时，自定义下载名"使用样例。
        shouldUseQiniuFileName: false
    };
    // 将七牛云相关配置初始化进本sdk
    qiniuUploader.init(options);
}

//获取应用实例
var app = getApp()
Page({
    data: {
        files:[],
        //图片上传成功参数
        successState:'',
        // 图片上传（从相册）返回对象。上传完成后，此属性被赋值
        imageObject: {},
        // 文件上传（从客户端会话）返回对象。上传完成后，此属性被赋值
        messageFileObject: {},
        // 图片上传（从相册）进度对象。开始上传后，此属性被赋值
        imageProgress: {},
        // 文件上传（从客户端会话）进度对象。开始上传后，此属性被赋值
        messageFileProgress: {},
        // 文件在线查看来源fileUrl
        viewFileOnlineFileUrl: '',
        // 文件下载进度对象。用于文件在线查看前的预下载
        downloadFileProgress: {},
        // 此属性在qiniuUploader.upload()中被赋值，用于中断上传
        cancelTask: function () { }
    },
    //上传图片路径到后端
    odidPressChooesImage: function (options) {
        var th = this;
        if(imageObject.imageURL != ''){
            wx.request({
                url: 'https://api.moxhub.cn//item/v1/addItem',
                method: 'post',
                success: function(res) {
                  th.setData({
                      itemId:"22",
                      imgUrl: res.imageObject.imageURL,
                      tag:"test1",
                      state:1,
                      pickLocation:"classroom",
                      placement:"classroom_1",
                      pickTime:"2022-11-2",
                      userId:"2"
                  });
                },
                fail:function(res){
                  console.log("-------fail------")
                }
              })
        }

      },
      chooseImage() {
        const that = this;
        wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success:function(res) {
             var filePath = res.tempFilePaths[0];
             // 交给七牛上传
             qiniuUploader.upload(filePath, (res) => {
              that.setData({
                'imageObject': res,
                'successState':true
              });
            }, (error) => {
              console.error('error: ' + JSON.stringify(error));
            });
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            if(res.successState == true){
              that.setData({
                files: that.data.files.concat(res.tempFilePaths),
              });
            }
          },
          fail:function(res){
            if(res.files == ''){
              that.setData({
                successState:'false'
              })
            }
          }
        });
      },
      previewImage(e) {
        wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files, // 需要预览的图片http链接列表
        });
      }
});

// 图片上传（从相册）方法
function didPressChooesImage(that) {
    // 详情请见demo部分 index.js
}

// 文件上传（从客户端会话）方法，支持图片、视频、其余文件 (PDF(.pdf), Word(.doc/.docx), Excel(.xls/.xlsx), PowerPoint(.ppt/.pptx)等文件格式)
function didPressChooesMessageFile(that) {
    // 详情请见demo部分 index.js
}

// 在线查看文件，支持的文件格式：pdf, doc, docx, xls, xlsx, ppt, pptx。关于wx.openDocument方法，详情请参考微信官方文档：https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.openDocument.html
function didPressViewFileOnline(that) {
    // 详情请见demo部分 index.js
}

