const App = getApp();
const METHODS = require("../../utils/methods.js").default;

Page({
  data: {},

  onLoad: function (options) {
    let that = this;
    that.setData({
      pageShow: true,
    });
  },

  onShow: function () {},
  skipPage(e){
    //METHODS.$confirmLogin(function(){
      METHODS.$navigationTo(e)
    //})
  },
  onShareAppMessage: function () {},
});
