// pages/user/index.js
var global = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow : false,
    userId : '',
    userInfo:'',
  },

  // 页面加载逻辑
  onLoad: function () {
    // console.log(global.userid);
    this.setData({
      userId: global.userid
    })
    this.getUserInfo(global.userid);
  },

  //设置显示个人信息
  SetInfoShow(e) {
    console.log("[findplatform-web] func SetInfoShow start.")
    console.log(e.detail.value);
    this.setData({
      isShow: e.detail.value
    })
  },

  // 获取用户信息
  getUserInfo: function(userid) {
    console.log("[findplatform-web] func getUserInfo start.")
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/usr/v1/queryUser?id='+userid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {},
      success(res) {
        // console.log(res.data);
        that.setData({
          userInfo : res.data,
        });
        console.log(that.data)
        console.log("[findplatform-web] func getUserInfo done.")
      },
      fail(res) {
        console.log("fail");
        console.log("!!! [findplatform-web] func getUserInfo fail.")
      },
      complete(res){   
        console.log('[findplatform-web] func getUserInfo complete.') ;
      } 
    })
  },

  // 路径跳转
  tapToUrl(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },

  // 复制地址链接
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
})
 