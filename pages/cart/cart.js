const App = getApp();
import METHODS from "../../utils/methods.js";

Page({
  data: {
    order: [
      {
        id: 0,
        store: '送王村电商扶贫驿站送王村电商扶贫驿站送王村电商扶贫驿站',
        status: '0',
        goods: [
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
          }
        ],
      },
      {
        id: 0,
        store: '送王村电商扶贫驿站',
        status: '0',
        goods: [
          {
            id: 3,
            img: 'https://i.loli.net/2020/05/25/K1yrcPnZXq4gQWA.png',
            title: '正宗巢湖特色淡水野生小银鱼晾晒鱼干',
            price: '129.99',
            spec: '一斤装',
            stock: 10,
            num: '1',
          }, {
            id: 4,
            img: 'https://i.loli.net/2020/05/25/K1yrcPnZXq4gQWA.png',
            title: '正宗巢湖特色淡水野生小银鱼晾晒鱼干',
            price: '129.66',
            spec: '一斤装',
            stock: 10,
            num: '2',
          }
        ],
      },
    ],
    totalCheck:false,
    total:0,
  },

  onLoad: function (options) {
    let that = this;
    let { order } = that.data;
    order.map((v,k)=>{
      v.checked = false;
      v.goods.map((v1,k1)=>{
        v1.checked = false;
      })
    })
    that.setData({
      order:order,
      pageShow: true
    })
  },
  onShow: function () {

  },
  blankHandle(e){
    let that = this;
    let { index,idx } =  e.currentTarget.dataset;
    let { order } = that.data;
    let { num} = order[index].goods[idx];
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
  // 店铺全选
  storeCheck:function(e){
    let that = this;
    let { index } =  e.currentTarget.dataset;
    let { order } = that.data;
    if (order[index].checked){
      order[index].checked = false;
      order[index].goods.map((v,k)=>{
        v.checked = false;
      })
    }else{
      order[index].checked = true;
      order[index].goods.map((v, k) => {
        v.checked = true;
      })
    }
    that.judgeTotal(order);
  },
  // 商品选择
  goodsCheck: function (e) {
    let that = this;
    let { index,idx } =  e.currentTarget.dataset;
    let { order } = that.data;
    if (order[index].goods[idx].checked) {
      order[index].goods[idx].checked = false;
      order[index].checked = false;
    } else {
      order[index].goods[idx].checked = true;
      order[index].checked = true;
      order[index].goods.map((v, k) => {
        if(v.checked==false){
          order[index].checked = false;
        }
      })
    }
    that.judgeTotal(order);
  },
  // 全选
  totalCheck:function(e){
    let that = this;
    let { totalCheck, order} = that.data;
    if (totalCheck){
      order.map((v, k) => {
        v.checked = false;
        v.goods.map((v1, k1) => {
          v1.checked = false;
        })
      })
    }else{
      order.map((v, k) => {
        v.checked = true;
        v.goods.map((v1, k1) => {
          v1.checked = true;
        })
      })
    }
    that.judgeTotal(order);
  },
  // 减少数量
  reduceNum: function (e) {
    let that = this;
    let { index,idx } =  e.currentTarget.dataset;
    let { order } = that.data;
    if (order[index].goods[idx].num > 1) {
      order[index].goods[idx].num--
    } else {
      order[index].goods[idx].num = 1;
    }
    that.judgeTotal(order);
  },
  // 增加数量
  addNum: function (e) {
    console.log(111)
    let that = this;
    let { index,idx } =  e.currentTarget.dataset;
    let { order } = that.data;
    let { num,stock} = order[index].goods[idx];
    order[index].goods[idx].num++;
    that.judgeTotal(order);
  },
  // 判断全选是否选中
  judgeTotal: function (order){
    let that = this;
    let { totalCheck } = that.data;
    let total = 0;
    let shopcar = [];
    totalCheck = true;
    order.map((v, k) => {
      if (v.checked == false) {
        totalCheck = false;
      }
      v.goods.map((v1, k1) => {
        if (v1.checked) {
          shopcar.push(v1.id)
          total = total + v1.price * v1.num;
        } else {
          total = total;
        }
      })
    })
    that.setData({
      totalCheck: totalCheck,
      total: total.toFixed(2),
      order: order,
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