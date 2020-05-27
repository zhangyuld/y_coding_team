const App = getApp();
const METHODS = require('../../../utils/methods.js').default;

Page({
  data: {
    location: '',
    set_default: true,
    info:{},
  },

  onLoad: function (options) {
    let that = this;
    that.setData({
      pageShow: true
    })
  },

  getInput(e){
    let that = this;
    let type = e.currentTarget.dataset.type;
    let info = that.data.info;
    info[type] = e.detail.value;
    that.setData({
      info: info,
    })
  },
  //选择默认
  chooseDefault: function () {
    let that = this;
    let info = that.data.info;
    info.is_default = info.is_default==0?1:0;
    that.setData({
      info: info,
    })
  },
  bindRegionChange: function (e) {
    let that = this;
    let info = that.data.info;
    info['province'] = e.detail.value[0];
    info['city'] = e.detail.value[1];
    info['area'] = e.detail.value[2];
    that.setData({
      info: info,
    })
  },
})