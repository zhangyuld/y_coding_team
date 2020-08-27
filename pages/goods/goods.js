const App = getApp();
import METHODS from "../../utils/methods.js";

Page({
  data: {
    goods:{
      banner:[
        { 
          id: 1, url:'http://mlc-xiaodian.oss-cn-shanghai.aliyuncs.com/dev/xd/upload/1/6/2019-08-24/5d60dd9ad0857.jpg' },
        {
          id: 2, url: 'http://mlc-xiaodian.oss-cn-shanghai.aliyuncs.com/dev/xd/upload/1/6/2019-08-24/5d60dda03f644.jpg'
        },
        {
          id: 3, url: 'http://mlc-xiaodian.oss-cn-shanghai.aliyuncs.com/dev/xd/upload/1/6/2019-08-24/5d60dda51df7d.jpg'
        },
      ],
      name:'迷你喷雾迷你喷雾迷你喷雾迷你喷雾迷你喷雾迷你喷雾迷你喷雾',
      goodsSpec:[
        { id: "30", spec_name: "小型", here_price: "15.00", sales: '18', now_stock: "83" },
        { id: "31", spec_name: "中型", here_price: "25.00", sales: '28', now_stock: "95" },
        { id: "32", spec_name: "大型", here_price: "35.00", sales: '38', now_stock: "100" },
      ],
      goodsAttr:[
        { attr_name: "温度", attr_son_arr: ['常温', '去冰', '少冰'], id: "23" },
        { attr_name: "辣度", attr_son_arr: ['常规辣', '不辣', '微辣', '中辣'], id: "24" },
      ],
      score:3
    },
    cartStatus:false,
    spec_price: '',  //当前选择价格
    spec_sales: '', //当前选择销量
    spec_stock: '', //当前选择库存
    spec_name: '', //当前选择规格名
    spec_id: '', //当前选择规格id
    attr_arr: [],  //当前选择属性数组
    spec_attr_str: '',  //当前选择规格+属性
    num:1,  //购买数量,

    type: '',  //addToCart:加入购物车，directBuy:直接购买
    shareStatus: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let { goods, spec_price, spec_sales, spec_stock, spec_name, spec_id, attr_arr, spec_attr_str } = that.data
    spec_price = goods['goodsSpec'][0]['here_price'];
    spec_sales = goods['goodsSpec'][0]['spec_sales'];
    spec_stock = goods['goodsSpec'][0]['now_stock'];
    spec_name = goods['goodsSpec'][0]['spec_name'];
    spec_id = goods['goodsSpec'][0]['id'];
    // 默认选择第一个属性
    (goods['goodsAttr'] || []).map((v,k)=>{
      attr_arr.push(v['attr_son_arr'][0]) 
    })
    // 当前选择 规格+属性 
    if (goods['goodsSpec'].length > 1) {
      spec_attr_str = spec_name + '+' + attr_arr.join('+')
    } else {
      spec_attr_str = '默认规格+' + attr_arr.join('+')
    }
    that.setData({
      spec_price,
      spec_sales,
      spec_stock,
      spec_name,
      spec_id,
      attr_arr,
      spec_attr_str,
      pageShow: true
    })
  },

  // 页面跳转
  skipPage(e){
    let that = this;
    let { url } = e.currentTarget.dataset;
    METHODS.$navigationTo(url)
  },
  // 分享提示框
  shareHandle(e){
    let that = this
    that.setData({
      shareStatus: !that.data.shareChoose
    })
  },

  // 选择属性弹窗
  cartPoppupHandle(e){
    let that = this
    let { cartStatus, type } = that.data
    let typeVal = e.currentTarget.dataset.type
    that.setData({
      cartStatus: !that.data.cartStatus, 
      type: typeVal
    })
  },

  // 减少数量
  minusHandle(){
    let that = this
    let { num } = that.data
    num -= 1
    that.setData({
      num
    })
  },

  //增加数量
  addHandle() {
    let that = this
    let { num } = that.data
    num += 1
    that.setData({
      num
    })
  },

  //选择规格
  specHandle(e){
    let that = this
    let { goods, spec_price, spec_sales, spec_stock, spec_name, spec_id, attr_arr, spec_attr_str } = that.data
    let index = e.currentTarget.dataset.index
    spec_price = goods['goodsSpec'][index]['here_price']
    spec_sales = goods['goodsSpec'][index]['spec_sales']
    spec_stock = goods['goodsSpec'][index]['now_stock']
    spec_name = goods['goodsSpec'][index]['spec_name']
    spec_id = goods['goodsSpec'][index]['id']
    // 当前选择 规格+属性 
    if (goods['goodsSpec'].length > 1) {
      spec_attr_str = spec_name + '+' + attr_arr.join('+')
    } else {
      spec_attr_str = '默认规格+' + attr_arr.join('+')
    }
    that.setData({
      spec_price,
      spec_sales,
      spec_stock,
      spec_name,
      spec_id,
      spec_attr_str
    })
  },

  //选择属性
  attrHandle(e){
    let that = this
    let { goods, spec_name, attr_arr, spec_attr_str } = that.data
    let index = e.currentTarget.dataset.index
    let attrIndex = e.currentTarget.dataset.attrindex
    attr_arr[index] = goods['goodsAttr'][index]['attr_son_arr'][attrIndex]
    // 当前选择 规格+属性 
    if (goods['goodsSpec'].length > 1) {
      spec_attr_str = spec_name + '+' + attr_arr.join('+')
    } else {
      spec_attr_str = '默认规格+' + attr_arr.join('+')
    }
    that.setData({
      attr_arr,
      spec_attr_str
    })
  },

  //直接购买 or 加入购物车
  confirmHandle(){
    let that = this
    let { cartStatus, num, spec_id, spec_attr_str, type } = that.data
    console.log(num)
    console.log(spec_id)
    console.log(spec_attr_str)
    console.log(type)
    //关闭弹窗
    that.setData({
      cartStatus: !that.data.cartStatus, 
    })
    // 直接购买
    if(type == 'directBuy'){
      wx.navigateTo({
        url: '/pages/order/orderSure/orderSure',
      })
    }else{
      //加入购物车
      wx.showToast({
        title: '加入购物车成功',
        icon:'none'
      })
    }
  },

  onShow: function () {

  },

  onShareAppMessage: function () {

  }
})