"use strict";
const chooseLocation = requirePlugin('chooseLocation');
Page({
  data: {
    itemId: "",
    latitude: 0,
    longitude: 0,
    style: 1,
    markers: [],
    item: [],
    userId: "",
    tag: "",
    pickTime: "",
    pickLocation: "",
    placement: "",
    state: "",
    itemInfo: "",
    itemName: "",
    imgUrl: "",
  },
  // 系统加载函数
  onLoad: function(options){
    console.debug(options)
    // 更新数据
    this.setData({
      itemId: options.id,
      style: 2
    })
    // 获取用户数据
    this.getItemInfo();
  },
  // 系统显示函数
  onShow: function () {
    const that = this;
    // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
    // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    const location = chooseLocation.getLocation();
    if(location){
      console.log(location);
      var marker = {
        id: 1,
        latitude: location.latitude,
        longitude: location.longitude,
        width: 30,
        height: 40,

        callout: {
          content: "物品所在位置",
          fontsize: 16,
          textAlign:'center',
          padding: 10
        }
      };
      var markers = new Array();
      markers.push(marker);
      this.setData({
          markers: markers,
          pickLocation: location.address?location.address : "",
          placement: location.name?location.name : "",
          latitude: location.latitude?location.latitude:"",
          longitude: location.longitude?location.longitude:"", 
      });
    } 
    else {
      var marker = {
        id: 1,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        width: 30,
        height: 40,

        callout: {
          content: "物品所在位置",
          fontsize: 16,
          textAlign:'center',
          padding: 10
        }

      }
      var markers = new Array();
      markers.push(marker);
      console.log(marker);
      this.setData({
          markers: markers,
      });
    }
  },

  // 初始化地图卡片
  initMapData: function() {
    const that = this;
    //使用在腾讯位置服务申请的key（必填）
    const key = "PYRBZ-LJ5CW-QIURH-RXG37-E6UDQ-4NBFY"; 
    const url = 'https://apis.map.qq.com/ws/geocoder/v1/?address=' + that.data.pickLocation + '&key=' + key;
    console.debug(url);
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?address=' + that.data.pickLocation + '&key=' + key,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {},
      success(res) {
        that.setData({
          longitude: res.data.result.location.lng,
          latitude: res.data.result.location.lat
        });
        console.log(res.data);
        console.log("[findplatform-web] func initMapData done.")
      },
      fail(res) {
        console.error("[findplatform-web] funcinitMapData fail.");
      },
      complete(res) {
        that.onShow();
        console.log("[findplatform-web] func initMapData complete.");
      },
    })
  },

  /**
   * button类：btnShowMap， btnSave
   */

  //显示地图插件
  btnShowMap: function() {
    //使用在腾讯位置服务申请的key（必填）
    const key = "PYRBZ-LJ5CW-QIURH-RXG37-E6UDQ-4NBFY"; 
    //调用插件的app的名称（必填）
    const referer = "findplatform"; 
    wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
    });
  },
  // 保存修改的地址信息
  btnSaveLocation: function() {
    console.log("[findplatform-web] func btnSaveLocation start.");
    var that = this;
    console.log(that.data);
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
        console.log(res);
        console.log("[findplatform-web] func btnSaveLocation done.");
      },
      
      fail(res) {
        console.log("[findplatform-web] func btnSaveLocation fail.");
      },

      complete(res){   
        wx.navigateBack({
          delta: 1
        });
        console.log('[findplatform-web] func btnSaveLocation complete.');
      } 
    })
  },

  // 获取物品信息
  getItemInfo: function () {
    console.log("[findplatform-web] func getItemInfo start.")
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/item/v1/queryItem/id?item_id='+that.data.itemId,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {},
      success(res) {
        console.debug(res.data);
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
        console.error("[findplatform-web] func getItemInfo fail.");
      },
      complete(res){   
        // 更新地图数据
        that.initMapData();
        console.log('[findplatform-web] func getItemInfo complete.') ;
      } 
    })
  },

});
