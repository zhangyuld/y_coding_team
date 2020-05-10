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
  async authLogin(e) {
    let that = this;
    if (e.detail.errMsg !== 'getUserInfo:ok') {
        return false;
    }
    wx.showLoading({
        title: "正在登录",
        mask: true
    });
    // 执行微信登录
    let ret = await METHODS.$login()

    let code = ret.code;
    let res = await METHODS.$getUserInfo({
      lang: "zh_CN",
    })
    that.doLogin(res.encryptedData, res.iv, code);
  },
  async doLogin(encryptedData, iv, code) {
    
    await METHODS.$http(
      {url: 'user/authLogin',method:'POST',data: {encryptedData,iv, code,}},
      {showLoading:true,}
    ).then(res => {
      if(res){
        wx.setStorageSync("user_token", res.token);
        wx.setStorageSync("userInfo", res.userinfo);
        wx.setStorageSync("isLogin", true);
        wx.showToast({
          title: '登录成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          });
        }, 1500);
        
      }
     
    })
  },
  
  cancle:function(){
    var that = this;
    wx.navigateBack({
      delta: 1,
    })
  },
  
  
})