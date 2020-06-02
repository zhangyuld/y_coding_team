const app = getApp();
const METHODS = require('../../../utils/methods.js').default;

Page({
  data: {
    list:[
      {
        category: {id: 2, title: "职场社交", active: null},
        create_time: "2020-05-09 15:13:17",
        discribe: "5个自我管理的好习惯，职场小白看过来！",
        id: 166,
        image: {flag: 1, file_path: "https://zhengqigou.oss-cn-shenzhen.aliyuncs.com/20200509151158c44204211.png"},
        title: "5个自我管理的好习惯，职场小白看过来！",
        views: 38,
      },{
        category: {id: 2, title: "职场社交", active: null},
        create_time: "2020-05-09 15:13:17",
        discribe: "5个自我管理的好习惯，职场小白看过来！",
        id: 166,
        image: {flag: 1, file_path: "https://zhengqigou.oss-cn-shenzhen.aliyuncs.com/20200509151158c44204211.png"},
        title: "5个自我管理的好习惯，职场小白看过来！",
        views: 38,
      }
    ]
  },
  onLoad: function () {
    let that = this;
    that.setData({
      pageShow: true
    })
  },
  skipPage(e){
    let that = this;
    METHODS.$navigationTo(e);
  },
  
  onShareAppMessage: function () {

  }
})