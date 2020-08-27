const App = getApp();
import METHODS from "../../../utils/methods.js";

Page({

  data: {
    address:'',
    integral_status:false,
    coupon_status: false,
    coupon_id:'',
    type:'balancePay',
    pay_type_status: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      pageShow: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  
  skipPage(e){
    let that = this;
    METHODS.$navigationTo(e)
  },

  // 使用积分
  integralChange(){
    let that = this
    that.setData({
      integral_status: !that.data.integral_status
    })
  },

  //使用优惠券
  couponHandle() {
    let that = this
    that.setData({
      coupon_status: !that.data.coupon_status
    })
  },
  selectCouponHandle(e){
    let that = this
    let index = e.currentTarget.dataset.index
    that.setData({
      coupon_id: index,
      coupon_status: !that.data.coupon_status
    })
  },

  //支付方式弹窗
  payOrderPopupHandle(){
    let that = this
    that.setData({
      pay_type_status: !that.data.pay_type_status
    })
  },

  //选择支付方式
  payTypeHandle(e){
    let that = this
    let type_val = e.currentTarget.dataset.type
    that.setData({
      type: type_val
    })
  },

  //支付订单
  payOrderHandle(){
    let that = this
    that.setData({
      pay_type_status: !that.data.pay_type_status
    })
    wx.navigateTo({
      url: '/pages/paySuccess/paySuccess',
    })
  },

})