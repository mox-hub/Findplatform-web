// Component({
//     properties: {
//       placeholder: {
//         type: String,
//         value: '',
//       }
//     },
//     data: {
//       inputValue: ''
//     },
//     methods: {
//       // 用户输入触发
//       handleInput: function(e) {
//         this.setData({
//           inputValue: e.detail.value
//         })
//       },
//       // 点击清空输入框icon
//       handleDeleteClick: function() {
//         this.setData({
//           inputValue: ''
//         })
//       },
//       // 点击取消触发
//       handleTextbtnClick() {
//         // 触发父组件中的方法
//         this.setData({
//           inputValue: ''
//         })
//       },
//       // 用户点击确定触发
//       handleConfirm() {
//         this.triggerEvent('handleSearch', this.data.inputValue)
//         console.log(this.data)
//       },
//     }


//   })

Page({
  data: {
    inputShowed: false,
    inputVal: ''
  },
  showInput() {
    this.setData({
      inputShowed: true,
    });
  },
  hideInput() {
    this.setData({
      inputVal: '',
      inputShowed: false,
    });
  },
  clearInput() {
    this.setData({
      inputVal: '',
    });
  },
  inputTyping(e) {
    this.setData({
      inputVal: e.detail.value,
    });
  },
  inputTyping(e){
    this.setData({
      inputVal: e.detail.value
    })
  },
  search(){
    var flag = this.data.inputVal;
    if(flag){
      wx.switchTab({
        url: '/pages/search/search',
      })
    }
 },
 
item01(){
  this.setData({
    inputVal:'雨伞'
  })
},
item02(){
  this.setData({
    inputVal:'水杯'
  })
},
item03(){
  this.setData({
    inputVal:'手机'
  })
},
item04(){
  this.setData({
    inputVal:'电脑'
  })
},
item05(){
  this.setData({
    inputVal:'耳机'
  })
},
item06(){
  this.setData({
    inputVal:'教材书籍'
  })
},
item07(){
  this.setData({
    inputVal:'校园卡'
  })
}
});
