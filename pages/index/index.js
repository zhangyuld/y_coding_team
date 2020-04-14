/*
 * @Date         : 2020-03-20 14:51:18
 * @LastEditors  : zhangyu
 * @LastEditTime : 2020-04-13 21:18:01
 * @Description  : 
 */
const App = getApp();
const methods = App.methods;
Page({

  data: {
    
  },
  onLoad: function (options) {
    let that = this;
    that.getInfo();
  },

  onShow: function () {
    
  },
  getInfo:async function(){
    let that = this;
    let page = that.data.page;
    let status = that.data.navIndex + 1;
    await METHODS.$http(
      {url: '/Wap/app/index',data: {page,status}},
      {loading:true}
    ).then(res => {
      wx.stopPullDownRefresh()
      
    })
  },
  skipPage(e){
    METHODS.$confirmLogin(function(){
      wx.requestSubscribeMessage({
        tmplIds: ['Y4jRKC8M5_wkxjW7HrBTislBCgwnsJdraMqbwoBef08'],
        success (res) {
          let tmpId =  Object.keys(res)[0];
          if(res[tmpId] == 'accept'){
            let user_id = wx.getStorageSync('user_id');
            let type = 'zp';
            METHODS.$http(
              {url: '/wap/app/addFormnum',data: { user_id,type }}
            )
          }
          METHODS.$navigationTo(e);
        }
      })
    })
   
    
  },
  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },

  onShareAppMessage: function () {
    
  }
})