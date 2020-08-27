module.exports = {
  DeliveryTypeEnum : {
    EXPRESS: {
      name: '快递配送',
      value: 10
    },
    EXTRACT: {
      name: '上门自提',
      value: 20
    },
    DISTRIBUTE: {
      name: '商家配送',
      value: 30
    }
  },
  PayTypeEnum :{
    BALANCE: {
      name: '余额支付',
      value: 10
    },
    WECHAT: {
      name: '微信支付',
      value: 20
    },
    SCORE: {
      name: '积分兑换',
      value: 30
    }
  }
}