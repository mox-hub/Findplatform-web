//app.js
import { colorUI } from './config/ColorUI.js'
import { colorUISdk } from './config/mp-sdk.js'
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  
  colorUI,//挂载到app上
  colorUISdk,
  onLaunch: function(options){
    
  },
  onShow: function(options){

  },
  globalData: {
    userInfo: {},
    openid:"",
    userid:"",
  }
});