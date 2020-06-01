const App = getApp();
const METHODS = require("../../../utils/methods.js").default;
Page({
  data: {
    info: {
      logo: 'https://i.loli.net/2020/04/26/fKTJNQuBs6AkPE8.jpg',
      name: '测试名称长度测试名称长度测试名称长度测试名称长度测试名称长度',
      phone: '18888888888',
    }
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      pageShow: true,
    });
  },

  onShow: function () {

  },
  chooseImage(e){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths[0];
        METHODS.$uploadImage(tempFilePaths,function(data){
          let { info } = that.data;
          let { type } = e.currentTarget.dataset;
          info[type] = data.file_path;
          that.setData({info});
        })
      }
    })
  },
  onInput(e){
    let that = this;
    let { info } = that.data;
    let { type } = e.currentTarget.dataset;
    info[type] = e.detail.value;
    that.setData({info});
  },
  sure(e){

  },
  onShareAppMessage: function () {
    return{
      path: '/pages/index/index'
    }
  }
})