// pages/user/change.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',
        BtnState: true,
        password:'',
        college:'',
        phoneNumber:'',
        password1:'',
        college1:'',
        phoneNumber1:''
    },
    onLoad:function(e){
        this.setData({
            id: e.url
        })
        this.getUserInfo()
    },
    /**
     * 获取用户信息
     */
    getUserInfo: function () {
        console.log("[findplatform-web] func getUserInfo start.");
        var that = this;
        wx.request({
          url: 'https://api.foocode.cn/usr/v1/queryUser?id='+that.data.id,
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          data: {},
          success(res) {
            that.setData({
              id: res.data.id,
              openid: res.data.openid,
              avatarUrl: res.data.avatarUrl,
              username: res.data.username,
              password: res.data.password,
              college: res.data.college,
              phoneNumber: res.data.phoneNumber
            });
            // console.log(res.data);
            console.log(that.data)
            console.log("[findplatform-web] func getUserInfo done.")
          },
          fail(res) {
            console.log("function getUserInfo fail.");
          },
          complete(res){  
            console.log("function getUserInfo complete.");
          } 
        })
      },
    updataUser:function(){
        var that = this;
        wx.request({
            url: 'https://api.foocode.cn/usr/v1/updateUser',
            header: {
              'content-type': 'application/json'
            },
            method: "POST",
            data: {
                "password":that.data.password,
                "college":that.data.college,
                "phoneNumber":that.data.phoneNumber,

                "id": that.data.id,
                "openid": that.data.openid,
                "avatarUrl": that.data.avatarUrl,
                "username": that.data.username
            },
      
            success(res) {
              console.log(that.data.password);
              console.log("[findplatform-web] func 111 done.");
            },
            
            fail(res) {
              console.log("[findplatform-web] func getItemInfo fail.");
            },
      
            complete(res){   
              console.log('[findplatform-web] func getItemInfo complete.') ;
            } 
          })
    },
    checkStatus:function(){
        this.updataUser(),
        wx.switchTab({
          url: './user?='+this.data.id,
          success: function () {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad(); //重新刷新device-info页面
          }
        })
    },
    pw_in:function(e){
        var val = e.detail.value;
        if(val != ''){
            this.setData({
                password1:val
            });
            if(this.data.college1 != '' && this.data.phoneNumber1 != ''){
              this.setData({
                  BtnState:false
              })
          }
        }
        else{
          this.setData({
            BtnState:true
          })
        }
      },
      co_in:function(e){
        var val = e.detail.value;
        if(val != ''){
            this.setData({
                college1:val
            });
            if(this.data.password1 != '' && this.data.phoneNumber1 != ''){
              this.setData({
                  BtnState:false
              })
          }
        }
        else{
          this.setData({
            BtnState:true
          })
        }
      },
      ph_in:function(e){
        var val = e.detail.value;
        if(val != ''){
            this.setData({
                phoneNumber1:val
            });
            if(this.data.password1 != '' && this.data.college1 != ''){
              this.setData({
                  BtnState:false
              })
          }
        }
        else{
          this.setData({
            BtnState:true
          })
        }
      },
      pw_va:function(e){
        var val = e.detail.value;
        this.setData({
            password:val
        })
      },
      co_va:function(e){
        var val = e.detail.value;
        this.setData({
            college:val
        })
      },
      ph_va:function(e){
        var val = e.detail.value;
        this.setData({
            phoneNumber:val
        })
      }
})