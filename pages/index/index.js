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
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
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
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    navData: [{
      title: '功能',
      sub: [
        { icon: 'cicon-set', name: 'search', title: '拾物者', color: 'green'},
        { icon: 'cicon-paint', name: 'about', title: '失物者', color: 'red'},
      ]
    },
  ],
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