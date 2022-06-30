// pages/collect/index.js
var global = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    item : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(global)
    this.setData({
      userId: global.userid
    })
    this.getCollectInfo(global.userid);
  },
  getCollectInfo: function (option) {
    console.log("[findplatform-web] func getCollectInfo start.")
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/collect/v2/queryItem/uid?uid='+option,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {},

      success(res) {
        console.log(res.data);
        var baseId = "img-" + (+new Date());
        var images = res.data.data;
        for (let i = 0; i < images.length; i++) {
          images[i].id = baseId + "-" + i;
        }
        that.setData({
          item: images
        });
        console.log("[findplatform-web] func getCollectInfo done.")
      },
      fail(res) {
        console.log("!!! [findplatform-web] func getCollectInfo fail.")
      }
    })
  }
})

