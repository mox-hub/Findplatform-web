// pages/search/index.js
Page({

  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
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

  onLoad: function () {
    console.log("[findplatform-web] Page <search> open.");
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        //加载首组图片
        console.log("[findplatform-web] func onImageLoad start.")
        this.getItemInfo();
        console.log("[findplatform-web] func onImageLoad done.")
      }
    })
  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width; //图片原始宽度
    let oImgH = e.detail.height; //图片原始高度
    let imgWidth = this.data.imgWidth; //图片设置的宽度
    let scale = imgWidth / oImgW; //比例计算
    let imgHeight = oImgH * scale; //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id == imageId) {
        imageObj = img;
        break;
      }
    }
    imageObj.height = imgHeight;
    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    col1.push(imageObj);

    let data = {
      loadingCount: loadingCount,
      col1: col1,
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }
    this.setData(data);
  },

  getItemInfo: function () {
    console.log("[findplatform-web] func getItemInfo start.")
    var that = this;
    wx.request({
      url: 'https://api.foocode.cn/item/v1/allItem',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      data: {},

      success(res) {
        // console.log(res.data);
        var baseId = "img-" + (+new Date());
        var images = res.data;
        for (let i = 0; i < images.length; i++) {
          images[i].id = baseId + "-" + i;
        }
        that.setData({
          loadingCount: images.length,
          images: images
        });
        console.log("[findplatform-web] func getItemInfo done.")
      },
      fail(res) {
        console.log("!!! [findplatform-web] func getItemInfo fail.")
      },
      complete(res){   
        console.log('[findplatform-web] func getItemInfo complete.') ;
      } 
    })
  }
})