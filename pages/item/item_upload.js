
const { colorUISdk } = require("../../config/mp-sdk");
const qiniuUploader = require("../../utils/qiniuUploader");
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var app = getApp()
var qqmapsdk;

// 初始化七牛云相关配置
function initQiniu() {
  var options = {
      // bucket所在区域，这里是华北区。ECN, SCN, NCN, NA, ASG，分别对应七牛云的：华东，华南，华北，北美，新加坡 5 个区域
      region: 'SCN',

      // 获取uptoken方法三选一即可，执行优先级为：uptoken > uptokenURL > uptokenFunc。三选一，剩下两个置空。推荐使用uptokenURL，详情请见 README.md
      // 由其他程序生成七牛云uptoken，然后直接写入uptoken
      uptoken: '',
      // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "0MLvWPnyy..."}
      uptokenURL: 'https://api.foocode.cn/img/v1/getToken/',
      
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

Page({
  // 数据对象
  data: {
      files:[],
      //图片上传成功参数
      successState: "",
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
      cancelTask: function () {},
      itemId:'',
      imgUrl:'',
      curLat:'',
      curLon:'',
      BtnState: true,
      imgList: [],
      numList: [
        {
            icon: '_icon-home',
            title: '开始',
        },
        {
            icon: '_icon-waiting',
            title: '等待',
        },
        {
            icon: '_icon-close-round',
            title: '错误',
        },
        {
            icon: '_icon-check-round',
            title: '完成',
        }
      ],
      pickLocation: '',
      placement:'',
      tag:'',
      tagId:'',
      color:'',
      city: '',
      num: 0,
  },

  // 生命周期函数--监听页面加载
  onLoad: function(options) {

    qqmapsdk = new QQMapWX({
      key: 'PYRBZ-LJ5CW-QIURH-RXG37-E6UDQ-4NBFY'
    });
    this.getUserLocation()

  },
  // 步进计数器
  numSteps: function() {
    this.setData({
      num: this.data.num == this.data.numList.length - 1 ? 0 : this.data.num + 1
    })
  },

  // 选择图片
  ChooseImage: function() {
    const that = this;
    initQiniu();
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择

      success:function(res) {
          var filePath = res.tempFilePaths[0];
          // 交给七牛上传
          qiniuUploader.upload(filePath, (res) => {
          that.setData({
            imageObject : res,
            successState : true,
            BtnState : false,
          })
          
          if(that.data.successState == true){
            that.setData({
              imgList: that.data.imgList.concat(filePath),
              num : 1,
            });
          }
        }, (error) => {
          console.error('error: ' + JSON.stringify(error));
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

      },

      fail:function(res){
        if(res.files == ''){
          that.setData({
            successState:false
          })
        }
      }

    });
  },

  // 图片预览
  ViewImage: function(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  // 删除图片
  DelImg: function(e) {
    var that = this;
    wx.showModal({
      title: '拾物者',
      content: '确定要删除这张照片吗？',
      cancelText: '不了',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          that.data.imgList.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            imgList: that.data.imgList
          })
        }
      }
    })
  },

  // 按钮：保存操作
  btnSave: function(){
    console.log("[findplatform-web] func itemSuccess start.")
    var that = this;
    that.getNewItemId();
  },

   // 按钮：取消操作 
  btnCancel(){
    console.log("[findplatform-web] func itemCancel start.")
    wx.navigateBack();
  },
  
  // [get] 获取一个新的物品id
  getNewItemId: function() {
    console.info("[findplatform-web] func getNewItemId start.")
    var that = this;
    var image = that.data.imageObject
    wx.request({
      url: 'https://api.foocode.cn/item/v2/newItemId',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log("[findplatform-web] func getNewItemId success.")
        console.log("[findplatform-web] data new itemid ==>"+ res.data)
        that.setData({
            itemId: res.data,
        });
      },
      fail:function(res){
        console.log("-------fail------")
      },
      complete:function(res) {
        console.log("[findplatform-web] func getNewItemId complete.")
        console.log(image.imageURL)
        that.getItemInfo(image.imageURL)
      }
    })
  },

  // [get] 获取图像识别结果
  getItemInfo: function(option) {
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/img/v1/getItemInfo?imgUrl=' + option,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },

      data: {},
      success: function(res) {
        console.log(res.data);
        that.setData({
          tag: res.data.tag_zh,
          tagEN: res.data.tag_en,
          color: res.data.color,
        })
      },

      fail:function(res){
        console.warn("[findplatform-web] func getItemInfo complete.")
      },
      complete:function(res) {
        console.log("[findplatform-web] func getItemInfo complete.")
        that.getTagId(res.data.tag_en);
      }
    })
  },

  getTagId: function(option) {
    console.log("[findplatform-web] func getTagId complete.")
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/tag/v2/getTagByNameEn?en=' + option,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {},
      success: function(res) {
        console.log(res.data);
        that.setData({
          tagId: res.data.data.tagId,
        })
      },

      fail:function(res){
        console.warn("[findplatform-web] func getTagId complete.")
      },
      complete:function(res) {
        console.log("[findplatform-web] func getTagId complete.")
        that.addItem();
      }
    })
  },
  
  // [post] 请求添加一个新物品
  addItem: function() {
    console.log("[findplatform-web] func addItem start.")
    var that = this;

    var moment = colorUISdk.isDate.year + '-'+ colorUISdk.isDate.month +'-' +  colorUISdk.isDate.date;
    var image = that.data.imageObject
    var itemid = String(that.data.itemId)
    wx.request({
      url: 'https://api.foocode.cn/item/v1/addItem',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        "itemId": String(that.data.itemId),
        "imgUrl": image.imageURL,
        "tagId":that.data.tagId,
        "state":0,
        "pickLocation": that.data.pickLocation,
        "placement": that.data.placement,
        "pickTime":moment,
        "userId":app.globalData.userid,
        "itemName": that.data.color + that.data.tag,
        "itemInfo":  that.data.color + that.data.tag + "捡取自"+ that.data.placement,
      },
      success: function(res) {
        console.log("[findplatform-web] func addItem success.")
        wx.navigateTo({
          url: '../item/item_change?url='+that.data.itemId+'&mode=upload',
        })
      },
      fail:function(res){
        console.log("-------fail------")
      }
    })
  },

  //地图定位
  getUserLocation: function() {
    console.info("getUserLocation")
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },

  // 微信获得经纬度
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        console.log(res);
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          pickLocation: res.result.address,
          placement: res.result.formatted_addresses.recommend
        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        // console.log(res);
      }
    });
  },
});


