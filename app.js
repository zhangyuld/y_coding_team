// const methods = require('/utils/methods.js').default;

App({
  onLaunch: async function () {

    let res = await this.methods.$promisify(wx.login)
    wx.setStorageSync('code', res.code)
    
    await this.methods.$http(
      {url: 'index/goodsRandomList?token=9313b9ae8f78d8f84cabab53daa677fd&user_id=12',method:true,data: {id: 1}},
      {showLoading:true,checkLogin:false}
    ).then(res => {
      console.log(res)
    })
  },
  globalData: {
    userInfo: null,
  },
  methods: require('/utils/methods.js').default
})