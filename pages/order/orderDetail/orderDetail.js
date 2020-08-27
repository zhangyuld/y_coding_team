const App = getApp();
import METHODS from "../../../utils/methods.js";
Page({

  data: {

  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      pageShow: true,
    })
  },
  onShow: function () {
    
  },
  skipPage(e){
    let that = this;
    let { url } = e.currentTarget.dataset;
    METHODS.$navigationTo(url);
  },
  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },

  onShareAppMessage: function () {
    return {
      path: "/pages/index/index"
    }
  }
})