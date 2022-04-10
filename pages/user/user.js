// pages/user/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    open : false,
    userId : '',
    userInfo:'',
  },
  onLoad: function () {
    console.log(getApp().globalData);
    this.setData({
      userId: getApp().globalData.userInfo.userId
    })
    this.getUserInfo();
  },

  infoToggle(e) {
    var that = this;
    if(that.open == true){
      that.open = false;
    }else {
      that.open = true;
      console.log(that);
    }
    this.setData({
      open:that.open
    })
  },

  getUserInfo: function() {
    console.log("[findplatform-web] func getUserInfo start.")
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/usr/v1/queryUser?id='+that.data.userId,
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
        console.log(111)
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
  }
})
 