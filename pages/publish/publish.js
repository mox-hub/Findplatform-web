// pages/publish/publish.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCollectInfo();
  },
  getCollectInfo: function () {
    console.log("[findplatform-web] func getCollectInfo start.")
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/collect/v1/allItem',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {},

      success(res) {
        console.log(res.data);
        var baseId = "img-" + (+new Date());
        var images = res.data;
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