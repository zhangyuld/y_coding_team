const App = getApp();
import METHODS from "../../utils/methods.js";

Page({
  data: {
    list: [
      {
        id: 1,
        img: 'https://i.loli.net/2020/05/25/K1yrcPnZXq4gQWA.png',
        title: '正宗巢湖特色淡水野生小银鱼晾晒鱼干正宗巢湖特色淡水野生小银鱼晾晒鱼干',
        price: '129.13',
        spec: '一斤装',
        stock: 10,
        num: '1',
      }, {
        id: 2,
        img: 'https://i.loli.net/2020/05/25/K1yrcPnZXq4gQWA.png',
        title: '正宗巢湖特色淡水野生小银鱼晾晒鱼干',
        price: '129.12',
        spec: '一斤装',
        stock: 10,
        num: '2',
      }, {
        id: 3,
        img: 'https://i.loli.net/2020/05/25/K1yrcPnZXq4gQWA.png',
        title: '正宗巢湖特色淡水野生小银鱼晾晒鱼干',
        price: '129.12',
        spec: '一斤装',
        stock: 10,
        num: '2',
      }, {
        id: 4,
        img: 'https://i.loli.net/2020/05/25/K1yrcPnZXq4gQWA.png',
        title: '正宗巢湖特色淡水野生小银鱼晾晒鱼干',
        price: '129.12',
        spec: '一斤装',
        stock: 10,
        num: '2',
      }
    ],
    totalCheck:false,
    total:0,
  },

  onLoad: function (options) {
    let that = this;
    let { list } = that.data;
    list.map((v,k)=>{
      v.checked = false;
    })
    that.setData({
      list:list,
      pageShow: true
    })
  },
  onShow: function () {

  },
  blankHandle(e){
    let that = this;
    let { index } =  e.currentTarget.dataset;
    let { list } = that.data;
    let { num} = list[index];
    if(num==1){
      wx.showToast({
        title: '已添加至最小库存',
        icon: 'none',
        mask: true
      })
    }else{
      wx.showToast({
        title: '已添加至最大库存',
        icon: 'none',
        mask: true
      })
    }
  },
  // 商品选择
  goodsCheck(e) {
    let that = this;
    let { index } =  e.currentTarget.dataset;
    let { list } = that.data;
    if (list[index].checked) {
      list[index].checked = false;
    } else {
      list[index].checked = true;
    }
    that.judgeTotal(list);
  },
  // 全选
  totalCheck(e){
    let that = this;
    let { totalCheck, list} = that.data;
    list.map((v, k) => {
      v.checked =  totalCheck ? false : true;
    })
    that.judgeTotal(list);
  },
  // 减少数量
  reduceNum(e) {
    let that = this;
    let { index } =  e.currentTarget.dataset;
    let { list } = that.data;
    list[index].num--
    that.judgeTotal(list);
  },
  // 增加数量
  addNum(e) {
    let that = this;
    let { index } =  e.currentTarget.dataset;
    let { list } = that.data;
    list[index].num++;
    that.judgeTotal(list);
  },
  // 判断全选是否选中
  judgeTotal(list){
    let that = this;
    let { totalCheck } = that.data;
    let total = 0;
    let shopcar = [];
    totalCheck = true;
    list.map((v, k) => {
      if (v.checked == false) {
        totalCheck = false;
      }else{
        shopcar.push(v.id)
        total = total + v.price * v.num;
      }
    })
    that.setData({
      totalCheck: totalCheck,
      total: total.toFixed(2),
      list: list,
      shopcar,
      canDel:shopcar.length>0?true:false,
    })
  },
  // 删除
  goodsDel(){
    let that = this;
    let { shopcar } = that.data;
    wx.showModal({
      title: '确认删除',
      content: '确认删除商品吗?',
      success(res){
        if(res.confirm){
          // 请求删除接口
        }
      }
    })
  },
  sure(){
    let that = this;
    let { shopcar } = that.data;
    if(shopcar && shopcar.length){
      wx.navigateTo({
        url: '/pages/order/orderSure/orderSure',
      })
    }else{
      wx.showToast({
        title: '请先选择商品!',
        icon: 'none',
        mask: true,
      })
    }
  },
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})