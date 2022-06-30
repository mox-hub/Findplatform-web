// pages/item/item_details.js
var global = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mode: '',
    itemId: '',
    item: '',
    user: '',
    userCardShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("[findplatform-web] Page <item_details> open.");
    this.setData({
      itemId: options.url,
      mode: options.mode
    })
    console.log("[findplatform-web] Data <itemId> gotten.");
    this.getItemInfo();
    // console.log(this);
  },

  /**
   * 获取物品信息
   */
  getItemInfo: function () {
    console.log("[findplatform-web] func getItemInfo start.")
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/item/v2/queryItem/id?item_id=' + that.data.itemId,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {},

      success(res) {
        console.log(res.data);
        that.setData({
          item: res.data,
          userId: res.data.userId
        });
        console.log("[findplatform-web] func getItemInfo done.");
      },

      fail(res) {
        console.log("[findplatform-web] func getItemInfo fail.");
      },

      complete(res) {
        console.log('[findplatform-web] func getItemInfo complete.');
        // 再这里调用用户信息，为了规范执行顺序
        that.getUserInfo(res.data.userId);
      }
    })
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function (options) {
    console.log("[findplatform-web] func getUserInfo start.");
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/usr/v1/queryUser?id=' + options,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {},
      success(res) {
        that.setData({
          user: res.data
        });
        console.log(res.data);
        console.log("[findplatform-web] func getUserInfo done.")
      },
      fail(res) {
        console.log("function getUserInfo fail.");
      },
      complete(res) {
        console.log("function getUserInfo complete.");
      }
    })
  },

  getLoacation: function (options) {
    wx.navigateTo({
      url: '/pages/location/location',
    })
  },

  tapToUrl(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  showUserCard: function () {
    this.setData({
      userCardShow: true
    })
  },

  btnItemCollect: function() {
    // /collect/v2/addCollect
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/collect/v2/addCollect',
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      data: {      
        "collectUid": global.userid,
        "itemId": that.data.itemId,
      },
      success(res) {
        that.$success({
          title : '收藏成功'
        })
        console.log("[findplatform-web] func getUserInfo done.")
      },
      fail(res) {
        console.log("function getUserInfo fail.");
      },
      complete(res) {
        console.log("function getUserInfo complete.");
      }
    })
  },
  
  // 删除物品按钮绑定事件
  itemDelete: function (options) {

  },
  //修改物品按钮绑定事件
  itemChange: function (options) {

  },
  //返回按钮绑定事件
  itemReturn: function (options) {

  },

  // 复制地址链接
  CopyPhone(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制电话',
          duration: 1000,
        })
      }
    })
  },

})