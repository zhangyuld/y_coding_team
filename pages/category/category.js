const App = getApp();
const METHODS = require('../../utils/methods.js').default;

Page({

  data: {
    searchKey: '',
    navIndex: 0,
    nav: ['全部','新品特惠','热销爆款'],
    categoryIndex: 0,
    category:[
      {
        id: 1,
        title: '好货推荐好货推荐',
        children: [
          {
            id: 1,
            logo: 'https://i.loli.net/2020/04/26/fKTJNQuBs6AkPE8.jpg',
            title: '商品名称商品名称商品名称商品名称商品名称',
            price: '11.9',
          },{
            id: 1,
            logo: 'https://i.loli.net/2020/04/26/fKTJNQuBs6AkPE8.jpg',
            title: '商品名称商品名称商品名称商品名称商品名称',
            price: '11.9',
          },{
            id: 1,
            logo: 'https://i.loli.net/2020/04/26/fKTJNQuBs6AkPE8.jpg',
            title: '商品名称商品名称商品名称商品名称商品名称',
            price: '11.9',
          },{
            id: 1,
            logo: 'https://i.loli.net/2020/04/26/fKTJNQuBs6AkPE8.jpg',
            title: '商品名称商品名称商品名称商品名称商品名称',
            price: '11.9',
          },{
            id: 1,
            logo: 'https://i.loli.net/2020/04/26/fKTJNQuBs6AkPE8.jpg',
            title: '商品名称商品名称商品名称商品名称商品名称',
            price: '11.9',
          },{
            id: 1,
            logo: 'https://i.loli.net/2020/04/26/fKTJNQuBs6AkPE8.jpg',
            title: '商品名称商品名称商品名称商品名称商品名称',
            price: '11.9',
          },{
            id: 1,
            logo: 'https://i.loli.net/2020/04/26/fKTJNQuBs6AkPE8.jpg',
            title: '商品名称商品名称商品名称商品名称商品名称',
            price: '11.9',
          },{
            id: 1,
            logo: 'https://i.loli.net/2020/04/26/fKTJNQuBs6AkPE8.jpg',
            title: '商品名称商品名称商品名称商品名称商品名称',
            price: '11.9',
          }
        ]
      },{
        id: 2,
        title: '猪肉',
        children: [
          {
            id: 1,
            logo: 'https://i.loli.net/2020/05/25/K1yrcPnZXq4gQWA.png',
            title: '商品名称商品名称商品名称商品名称商品名称',
            price: '11.9',
          },{
            id: 1,
            logo: 'https://i.loli.net/2020/05/25/K1yrcPnZXq4gQWA.png',
            title: '商品名称商品名称商品名称商品名称商品名称',
            price: '11.9',
          },{
            id: 1,
            logo: 'https://i.loli.net/2020/05/25/K1yrcPnZXq4gQWA.png',
            title: '商品名称商品名称商品名称商品名称商品名称',
            price: '11.9',
          }
        ]
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
  skipPage(e){
    METHODS.$navigationTo(e)
  },
  search(e){
    let text = e.detail;
    let url = `pages/search/goods/goods?key=${text}`
    METHODS.$navigationTo(url)
  },
  navChoose(e){
    let that = this;
    let { index } = e.currentTarget.dataset;
    that.setData({
      navIndex: index,
    })
  },
  cateChoose(e){
    let that = this;
    let { id,index } = e.currentTarget.dataset;
    that.setData({
      categoryIndex: index,
      scroll_id: id,
    })
  },
  scroll(e){

  },
  onShareAppMessage: function () {

  }
})