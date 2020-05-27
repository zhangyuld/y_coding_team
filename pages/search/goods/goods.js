const App = getApp();
const METHODS = require('../../../utils/methods.js').default;

Page({
  data: {
    searchKey: '',
    nav: ['全部','视频看货','附近'],
    navIndex: 0,
  },

  onLoad: function (options) {
    let that = this;
    that.setData({
      searchKey: options.key || '',
      pageShow: true
    })
  },
  onShow: function () {

  },
  search(e){
    console.log(e)
    let key = e.detail;
  },
  navChoose(e){
    let that = this;
    let { index } = e.currentTarget.dataset;
    that.setData({
      navIndex: index
    })
  },
  skipPage(e){
    let that = this;
    let { url } = e.currentTarget.dataset;
    METHODS.$navigationTo(url);
  },
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})