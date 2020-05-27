const App = getApp();
const METHODS = require('../../utils/methods.js').default;
Page({

  data: {
    banner:[
      { id: 1, url: 'http://www.pinnoocle.net/static/index/img/banner1-min.png' },
      { id: 2, url: 'http://www.pinnoocle.net/static/index/img/banner2-min.png' },
      { id: 3, url: 'http://www.pinnoocle.net/static/index/img/banner3-min.png' },
    ],
    menu: [
      {
        id: "1",
        image: "/images/menu1.png",
        title: "水果",
        url: "",
      },{
        id: "2",
        image: "/images/menu2.png",
        title: "坚果干果",
        url: "",
      },{
        id: "3",
        image: "/images/menu3.png",
        title: "蔬菜",
        url: "",
      },{
        id: "4",
        image: "/images/menu4.png",
        title: "农副产品",
        url: "",
      },{
        id: "5",
        image: "/images/menu5.png",
        title: "肉禽蛋类",
        url: "",
      },{
        id: "5",
        image: "/images/menu6.png",
        title: "海鲜水产",
        url: "",
      },{
        id: "5",
        image: "/images/menu7.png",
        title: "速冻冷冻",
        url: "",
      },{
        id: "5",
        image: "/images/menu8.png",
        title: "粮油食品",
        url: "",
      }
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
    
  }
})