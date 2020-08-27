const APP = getApp();
const METHODS = require('../../../utils/methods.js').default

Page({
  data: {

  },
  onLoad: function () {
    var that = this;
  },
  imageLoad(e){
    this.setData({
      pageShow: true
    })
  },
  async getPhoneNumber(e){
    let that = this;
    let iv = e.detail.iv
    let encryptedData = e.detail.encryptedData
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {

    } else {
      let ret = await METHODS.$login()
      let code = ret.code;
      
      let res1 = await METHODS.$http({
        url: 'user/getWechatUserPhone',
        method: "POST",
        data: {
          encryptedData: encryptedData,
          iv: iv,
          code: code
        }
      })
      if(res1 === false){return false};
      let res2 = await METHODS.$http({
        url: "user/addPhone",
        data: {phone: res1}
      })
      if(res2 === false){return false};
      wx.setStorageSync("token", res2.token);
      wx.setStorageSync("user_id", res2.user_id);
      wx.setStorageSync("getPhone", true);
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  
  cancle:function(){
    var that = this;
    wx.navigateBack({
      delta: 1,
    })
  },
  onShareAppMessage(){
    let that = this;
    // 构建页面参数
    let params = METHODS.$getShareUrlParams();
    return {
      path: "/pages/index/index?" + params
    };
  }
  
})