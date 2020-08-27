const App = getApp();
import METHODS from "../../../utils/methods.js";

Page({

  data: {

  },

  onLoad: function (options) {
    let that = this;
    that.setData({
      pageShow: true
    })
  },
  skipPage(e){
    let that = this;
    METHODS.$navigationTo(e)
  },
  // 删除
  delHandle(){
    wx.showModal({
      title: '提示',
      content: '确定要删除地址吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  onReachBottom: function () {

  },
})