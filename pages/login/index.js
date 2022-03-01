// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginBtnState: true,
        username:"",
        password:""
    },
    usernameinput:function(e){
      var val = e.detail.value;
      if(val != ''){
          this.setData({
              username:val
          });
          if(this.data.password != ''){
            this.setData({
                loginBtnState: false
            })
        }
      }
      else{
        this.setData({
            loginBtnState: true
        })
      }
    },
    passwordinput:function(e){
        var val = e.detail.value;
        if(val != ''){
            this.setData({
                password:val
            });
            if(this.data.username != ''){
                this.setData({
                    loginBtnState: false
                })
            }
        }
        else{
            this.setData({
                loginBtnState: true
            })
          }
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

    },
    clickView() {
        wx.getUserProfile({
            desc: '用于完善用户信息',
            success: (res)=> {
                console.log(res);
            },
        })
    },
    login:function(){
        wx.switchTab({
          url: '../index/index',
        });
    },
    register:function(){
        wx.navigateTo({
          url: '../register/index',
        });
    },
    repassword:function(){
        wx.navigateTo({
          url: '../repassword/index',
        });
    }      
})