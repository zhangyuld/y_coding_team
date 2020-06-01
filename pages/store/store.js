const App = getApp();
const METHODS = require('../../utils/methods.js').default;

Page({

  data: {
    banner:[
      { id: 1, url: 'http://www.pinnoocle.net/static/index/img/banner1-min.png' },
      { id: 2, url: 'http://www.pinnoocle.net/static/index/img/banner2-min.png' },
      { id: 3, url: 'http://www.pinnoocle.net/static/index/img/banner3-min.png' },
    ],
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      pageShow: true
    })
  },

  onShow: function () {

  },
  // 分享提示框
  shareHandle(e){
    let that = this
    that.setData({
      shareStatus: !that.data.shareChoose
    })
  },
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})