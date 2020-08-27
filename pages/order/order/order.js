const App = getApp();
import METHODS from "../../../utils/methods.js";
Page({

  data: {
    nav: [
      {
        type: 'all',
        title: '全部'
      },{
        type: 'payment',
        title: '待付款'
      },{
        type: 'delivery',
        title: '待发货'
      },{
        type: 'received',
        title: '待收货'
      },{
        type: 'comment',
        title: '已完成'
      }
    ]
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      pageShow: true,
      type: options.type
    })
  },
  onShow: function () {
    
  },
  skipPage(e){
    let that = this;
    let { url } = e.currentTarget.dataset;
    METHODS.$navigationTo(url);
  },
  navChoose(e){
    let that = this;
    let { type } = e.currentTarget.dataset;
    that.setData({
      type
    })
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