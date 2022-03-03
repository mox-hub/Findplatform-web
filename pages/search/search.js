// pages/search/index.js
Page({

    data: {
      scrollH: 0,
      imgWidth: 0,
      loadingCount: 0,
      images: [],
      col1: [],
      col2: []
    },
  
    onLoad: function () {
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
          this.loadImages();
        }
      })
    },
  
    onImageLoad: function (e) {
      let imageId = e.currentTarget.id;
      let oImgW = e.detail.width;         //图片原始宽度
      let oImgH = e.detail.height;        //图片原始高度
      let imgWidth = this.data.imgWidth;  //图片设置的宽度
      let scale = imgWidth / oImgW;        //比例计算
      let imgHeight = oImgH * scale;      //自适应高度
  
      let images = this.data.images;
      let imageObj = null;
  
      for (let i = 0; i < images.length; i++) {
        let img = images[i];
        if (img.id === imageId) {
          imageObj = img;
          break;
        }
      }
  
      imageObj.height = imgHeight;
  
      let loadingCount = this.data.loadingCount - 1;
      let col1 = this.data.col1;
      let col2 = this.data.col2;
  
      //判断当前图片添加到左列还是右列
      if (col1.length <= col2.length) {
        col1.push(imageObj);
      } else {
        col2.push(imageObj);
      }
  
      let data = {
        loadingCount: loadingCount,
        col1: col1,
        col2: col2
      };
  
      //当前这组图片已加载完毕，则清空图片临时加载区域的内容
      if (!loadingCount) {
        data.images = [];
      }
  
      this.setData(data);
    },
  
    loadImages: function () {
      let images = [
        {
          item_id: 'wp0001',
          state: true,
          name: '手机',
          imageurl: '/icons/index01.png',
          pick_location: 'school-hall',
          pick_time: '2021-11-18',
          tag: 'phone',
          height: 0, 
        },
        {
          item_id: 'wp0002',
          state: false,
          name: '雨伞',
          imageurl: '/icons/index02.png',
          pick_location: 'school-hall',
          pick_time: '2021-11-18',
          tag: 'phone',
          height: 0, 
        },
        {
          item_id: 'wp0003',
          state: true,
          name: '彩色水杯',
          imageurl: '/icons/WTS[E6ED)OU)(391YQ34KC2.png',
          pick_location: 'school-hall',
          pick_time: '2021-11-18',
          tag: 'phone',
          height: 0, 
        },
        {
          item_id: 'wp0004',
          state: false,
          name: '笔记本电脑',
          imageurl: '/icons/index04.png',
          pick_location: 'school-hall',
          pick_time: '2021-11-18',
          tag: 'phone',
          height: 0,
        },
        {
          item_id: 'wp0005',
          state: true,
          name: '西瓜雨伞',
          imageurl: '/icons/ub04.png',
          pick_location: 'school-hall',
          pick_time: '2021-11-18',
          tag: 'phone',
          height: 0,
        }
      ];
  
      let baseId = "img-" + (+new Date());
  
      for (let i = 0; i < images.length; i++) {
        images[i].id = baseId + "-" + i;
      }
  
      this.setData({
        loadingCount: images.length,
        images: images
      });
    }
  
  })
  