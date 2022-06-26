// pages/item/item_change.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        url:'',
        mode:'default',
        itemId:'',
        item:'',
        user:'',
        tag:'',
        pickTime:'',
        pickLocation:'',
        state:'',
        itemInfo:'',
        itemName:'',
        placement:'',
        imgUrl:'',
        numList: [
          {
              icon: '_icon-home',
              title: '开始',
          },
          {
              icon: '_icon-waiting',
              title: '等待',
          },
          {
              icon: '_icon-close-round',
              title: '错误',
          },
          {
              icon: '_icon-check-round',
              title: '完成',
          }
      ],
        num: 3,
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log("[findplatform-web] itemId gotten.");
      this.setData({
          itemId:options.url,
          mode: options.mode
      })
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
        url: 'https://api.foocode.cn/item/v1/queryItem/id?item_id='+that.data.itemId,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        data: {
        },
  
        success(res) {
          console.log(res.data);
          that.setData({
            item: res.data,
            userId: res.data.userId,
            tag: res.data.tag,
            pickTime: res.data.pickTime,
            pickLocation: res.data.pickLocation,
            state: res.data.state,
            itemInfo: res.data.itemInfo,
            itemName: res.data.itemName,
            placement: res.data.placement,
            imgUrl: res.data.imgUrl
          });
          console.log("[findplatform-web] func getItemInfo done.");
        },
        
        fail(res) {
          console.log("[findplatform-web] func getItemInfo fail.");
        },
  
        complete(res){   
          console.log('[findplatform-web] func getItemInfo complete.') ;
          // 再这里调用用户信息，为了规范执行顺序
          that.getUserInfo(res.data.userId);
        } 
      })
    },
    
    tapToUrl(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
    /**
     * 获取用户信息
     */
    getUserInfo: function (options) {
      console.log("[findplatform-web] func getUserInfo start.");
      var that = this;
      wx.request({
        url: 'https://api.foocode.cn/usr/v1/queryUser?id='+options,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        data: {},
        success(res) {
          console.log(res.data)
          that.setData({
            user: res.data
          });
          // console.log(res.data);
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
    itemName:function(e){
      var val=e.detail.value
      console.log(val)
      this.setData({
        itemName:val
      });
    },
    tag:function(e){
      var val=e.detail.value
      console.log(val)
      this.setData({
        tag:val
      });
    },
    pickTime:function(e){
      var val=e.detail.value
      console.log(val)
      this.setData({
        pickTime:val
      });
    },    
    pickLocation:function(e){
      var val=e.detail.value
      console.log(val)
      this.setData({
        pickLocation:val
      });
    },    
    state:function(e){
      var val=e.detail.value
      console.log(val)
      this.setData({
        state:val
      });
    },    
    itemInfo: function(e){
      var val=e.detail.value
      console.log(val)
      this.setData({
        itemInfo:val
      });
    },

    /**
     * 更改物品信息
     */
    updateItem: function() {
      console.log("[findplatform-web] func updateItem start.")
      var that = this;
      wx.request({
        url: 'https://api.foocode.cn/item/v1/updateItem',
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        data: {
          "tag":that.data.tag,
          "state":that.data.state,
          "pickLocation": that.data.pickLocation,
          "pickTime": that.data.pickTime,
          "itemInfo":that.data.itemInfo,
          "itemId":that.data.itemId,
          "imgUrl":that.data.imgUrl,
          "placement":that.data.placement,
          "userId":that.data.userId,
          "itemName":that.data.itemName
        },
  
        success(res) {
          // console.log(res);
          // console.log(that.data.tag)
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
    /**
     * 删除物品
     */
    delateItem: function() {
      console.log("[findplatform-web] func delateItem start.")
    },
    /**
     * 物品修改并跳转
     */
    itemChange: function(){
      this.updateItem(),
      // console.log(this.item.itemId)
      wx.navigateTo({
        url: '/pages/item/item_details?url='+this.data.item.itemId
      })
    },

    /**
     * 物品取消上传或者删除
     */
    itemDelete :function() {
      this.delateItem(),
      wx.switchTab({
        url: '/pages/index/index',
      })
    },


  })