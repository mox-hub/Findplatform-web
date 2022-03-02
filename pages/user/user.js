// pages/user/index.js
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
        open : false,
        id : "20220001",
        username : "不醒人室",
        phone : "12345678912",
        QQ : "88888888"
    },
   
    showUserInfoTap:function(){
        var th = this;
        wx.request({
          url: 'https://api.moxhub.cn/allUser',
          success: function(res) {
            console.log(res)
            console.log(res.data[0].id)
            th.setData({
              username:res.data[0].username,
              phone:res.data[0].phone,
              QQ:res.data[0].QQ
            });
          },
          fail:function(res){
            console.log("-------fail------")
          }
        })
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
   
    },
   
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
   
    },
   
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
   
    },
   
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
   
    },
   
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
   
    },
   
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
   
    },
   
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
   
    }
  })
 