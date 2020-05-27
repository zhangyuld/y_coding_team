const App = getApp();
const METHODS = require('../../../utils/methods.js').default;

Page({
  data: {
    searchKey: '',
    history:[
      {
        text: '西瓜',
      },{
        text: '西瓜',
      },{
        text: '西瓜',
      }
    ]
  },

  onLoad: function (options) {
    let that = this;
    that.setData({
      pageShow: true
    })
  },
  onShow: function () {

  },
  search(e){
    let text = e.detail;
    let url = `pages/search/goods/goods?key=${text}`
    METHODS.$navigationTo(url)
  },
  historyTap(e){
    let that = this;
    let { text } = e.currentTarget.dataset;
    that.setData({
      searchKey: text
    })
    let url = `pages/search/goods/goods?key=${text}`
    METHODS.$navigationTo(url)
  },
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})