"use strict";
const chooseLocation = requirePlugin('chooseLocation');
Page({
  data: {
    address: "",
    locationName: "",
    latitude: 0,
    longitude: 0,
    style: 1,
    markers: [],
  },

  onLoad: function(){
    this.setData({
      style: 2
    })
  },

  onShow: function () {
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

      }
      var markers = new Array();
      markers.push(marker);
      this.setData({
          markers: markers,
          address: location.address?location.address : "",
          locationName: location.name?location.name : "",
          latitude: location.latitude?location.latitude:"",
          longitude: location.longitude?location.longitude:"", 
      });
    }
  },
  //显示地图
  showMap() {

    //使用在腾讯位置服务申请的key（必填）
    const key = "PYRBZ-LJ5CW-QIURH-RXG37-E6UDQ-4NBFY"; 
    //调用插件的app的名称（必填）
    const referer = "findplatform"; 
    wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
    });
  }
});
