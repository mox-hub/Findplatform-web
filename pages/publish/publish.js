// pages/publish/publish.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userid: "",
    item : [],
    // 触摸开始时间
    touchStartTime: 0,
    // 触摸结束时间
    touchEndTime: 0, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userid: options.user_id,
    })
    this.getPublishInfo(options.user_id);
  },

  getPublishInfo: function (option) {
    console.log("[findplatform-web] func getPublishInfo start.")
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/publish/v2/getUserPublish?user_id=' + option,
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
        console.log("[findplatform-web] func getPublishInfo done.")
      },
      fail(res) {
        console.warn("!!! [findplatform-web] func getPublishInfo fail.")
      }
    })
  },

  itemLongTap: function (option) {
    this.$showDialog({
      title : '删除物品',
      content: '您是否要删除已发布的物品？注意：删除后无法找回',
      success: res => {
        console.log(res)
        if(res.confirm){
          // 请求删除物品
          wx.request({
            url: 'https://api.foocode.cn/item/v1/deleteItem/' + option.currentTarget.dataset.id,
            header: {
              'content-type': 'application/json'
            },
            method: "POST",
            data: {},
      
            success(res) {
              console.info("[findplatform-web] func delete done.")
            },
            fail(res) {
              console.warn("!!! [findplatform-web] func delete fail.")
            }
          })
          this.$success({
              title : '确定'
          })
        }
        else{
          wx.showToast({
              title: '已取消',
              icon : 'none'
          })
        }
      }
    })
  },

  // 按钮触摸开始触发的事件
  touchStart: function(e) {
    this.touchStartTime = e.timeStamp
  },
  
  // 按钮触摸结束触发的事件
  touchEnd: function(e) {
    this.touchEndTime = e.timeStamp
  },

  tapToUrl(e) {
    var that = this
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (that.touchEndTime - that.touchStartTime < 350) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  },
})