// pages/feedback/feedback.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uploadBtnState:true,
        text:'',
        wx:'',
        phone:''
    },
    textinput:function(e){
        var val = e.detail.value;
        if(val != ''){
            this.setData({
                text:val
            });
            if(this.data.phone != '' && this.data.wx != ''){
              this.setData({
                  uploadBtnState:false
              })
          }
        }
        else{
          this.setData({
            uploadBtnState:true
          })
        }
      },
      wxinput:function(e){
        var val = e.detail.value;
        if(val != ''){
            this.setData({
                wx:val
            });
            if(this.data.text != '' && this.data.phone != ''){
              this.setData({
                  uploadBtnState:false
              })
          }
        }
        else{
          this.setData({
            uploadBtnState:true
          })
        }
      },
      phoneinput:function(e){
        var val = e.detail.value;
        if(val != ''){
            this.setData({
                phone:val
            });
            if(this.data.text != '' && this.data.wx != ''){
              this.setData({
                  uploadBtnState:false
              })
          }
        }
        else{
          this.setData({
            uploadBtnState:true
          })
        }
      },
      upload:function(){
        wx.redirectTo({
          url: '/pages/msg/msg_success'
        });
    },

})