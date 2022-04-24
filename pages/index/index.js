// pages/index/index.js
const app = getApp();
Page({
  data: {
    searchBtnState:false
  },
  onLoad: function(options){
  },
});

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: [{
        title: '我是拾物者',
        background: 'bg-green-gradient',
        img: '/images/index/icons8-emoji1-64.png',
        url: '/item/item_upload'
    },
      {
        title: '我是失物者',
        background: 'bg-red-gradient',
        img: '/images/index/icons8-emoji-64.png',
        url: '/search/search'
      }
    ]
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