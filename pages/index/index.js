// pages/index/index.js
const app = getApp();
Page({
  data: {
    searchBtnState:false,
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }],
  },
  onLoad: function(options){
  },
});

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }],
    navData: [{
      title: '功能',
      sub: [
        { icon: 'cicon-set', name: 'picker', url: 'item/item_upload', title: '拾物者', color: 'green',type: 'navigate'},
        { icon: 'cicon-paint', name: 'about', url: 'search/search', title: '失物者', color: 'red',type: 'switchTab'},
      ]
    },
  ],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  methods: {
    toChild(e) {
      if (e.currentTarget.dataset.url == "/search/search") {
        wx.switchTab({
          url: '/pages' + e.currentTarget.dataset.url
        })
      }
      else {
        wx.navigateTo({
          url: '/pages' + e.currentTarget.dataset.url
        })
      }
    },
  }
})