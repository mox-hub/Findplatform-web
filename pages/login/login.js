const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    hasUserInfo: false,
    userInfo: {},
    openid:'',
    session_key:'',
    nickName: '',
    avatarUrl: '',
    userid:''
  },
// 现在暂时没有作用
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log(res);
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success : function (res) {
            }
          });
        } 
      },
    });
  },

  // 获取用户头像和昵称
  getUserProfile: function() {
    console.log("[findplatform-web] func getUserProfile start.");
    var that = this;
    wx.getUserProfile({

      desc: '用于完善资料', 
      success: (res) => {
        console.log("[findplatform-web] func getUserProfile success.");
        console.log(res);

        this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        });

        var encryptedData = res.encryptedData;
        var iv = res.iv;

        // 这里进行微信登录操作
        wx.login({
          success: res => {
            console.log("[findplatform-web] wx.login start.");
            if(res.code){
              console.log("[findplatform-web] value code==>" + res.code)
              that.getSessionKey(res.code, encryptedData, iv);
            }
          },
          fail: res =>{
            console.log("[findplatform-web] wx.login fail !!!" + res)
          }
        })

      },
      fail(res) {
        //用户按了拒绝按钮
        console.log("[findplatform-web] func getUserProfile user refuse.");
        wx.showModal({
          title:'警告',
          content:'您点击了拒绝授权，将无法使用小程序，请授权之后再进入!!!',
          showCancel:false,
          confirmText:'返回',
          success:function(res){
              if (res.confirm) {
                console.log("[findplatform-web] func getUserProfile user clicked '返回授权'.");
              } 
          }
      })
        console.log("!!! [findplatform-web] func getUserProfile fail.")
      },
      complete(res){   
        console.log('[findplatform-web] func getUserInfo complete.') ;
      } 
    })
  },

  // 请求获得sessionKey 和 openid
  getSessionKey: function(js_code, encryptedData, iv) {
    console.log("[findplatform-web] func getSessionKey start.");
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/wxLogin/v1/getSessionKey',
      data: {
          'jscode': js_code,
          'checkCode': 'sign'
      },
      method: 'GET', 
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log("[findplatform-web] func getSessionKey success.");

        console.log("[findplatform-web] value openid==>" +  res.data.openid);
        console.log("[findplatform-web] value sessionkey==>" +  res.data.session_key);
        
        if(res.data == undefined){
          wx.showToast({
            icon: "none",
            title: 'session_key获取失败，请重新登录！',
          });
        }
        else {
          that.setData({
            openid: res.data.openid,
            session_key:res.data.session_key
          })
        }
      },
      fail: function(res) {
        console.log("!!![findplatform-web] func getSessionKey fail.");
        wx.showToast({
          icon: "none",
          title: 'session_key获取失败，请重新登录！',
        })
      },
      complete: function(res) {
        console.log("[findplatform-web] func getSessionKey complete.");
        that.queryUserInfo(res.data.openid);
      }
    })
  }, 

//获取用户信息接口
  queryUserInfo: function (option) {
    console.log("[findplatform-web] func queryUserInfo start.");
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/usr/v2/queryUser/openid',
      data: {
        openid: option
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data.code == 0) {
          getApp().globalData.userInfo = res.data.data;
          console.log(res)
          var tmp = res.data.data
          getApp().globalData.userid = tmp.id;
          console.log(tmp.id);
          wx.switchTab({
            url: '/pages/user/user',
            success: function(e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
          
        } else if(res.data.code == -1){
          that.getNewUserId();
        }      
      }
    })
  },

  addNewUser: function(userid) {
    console.log(userid)
    console.log("[findplatform-web] func addNewUser start.");
    var that = this;
    //插入登录的用户的相关信息到数据库
    wx.request({
      url: 'https://api.foocode.cn/usr/v1/addUser',
      data: {
        "id" : userid,
        "username": that.data.nickName,
        "openid" : that.data.openid,
        "avatarUrl":that.data.avatarUrl,
        "password":"12",
        "college":"12",
        "phoneNumber":"12",
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success: function (res) {
        //从数据库获取用户信息
        console.log("插入小程序登录用户信息成功！");
        
        that.setData({
          hasUserInfo: true,
          id: userid
        })
      },
      complete:function(){
        //授权成功后，跳转进入小程序首页
        var user =  getApp().globalData
        wx.navigateTo({
          url: '../user/change_user_info?url='+user.userid,
        })
      }
    });
  },

  getNewUserId: function() {
    console.log("[findplatform-web] func getNewUserId start.");
    var that = this;
    wx.request({
      url: 'http://api.foocode.cn/usr/v2/newUserId',
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function (res) {
        console.log("[findplatform-web] func getNewUserId success.");
        //从数据库获取用户信息
        console.log(res);
        getApp().globalData.userid = res.data;
        that.setData({
          userid: res.data,
        })
      },
      complete: function(res) {
        that.addNewUser(res.data);
      }
    });
  }

});
