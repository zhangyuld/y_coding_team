const App = getApp();
const METHODS = require('../../utils/methods.js').default;

Page({
  data: {
    banner:[
      { id: 1, url: 'http://www.pinnoocle.net/static/index/img/banner1-min.png' },
      { id: 2, url: 'http://www.pinnoocle.net/static/index/img/banner2-min.png' },
      { id: 3, url: 'http://www.pinnoocle.net/static/index/img/banner3-min.png' },
    ],
    nav: [
      {
        type: '1',
        title: '关注'
      },{
        type: '2',
        title: '精选'
      },{
        type: '3',
        title: '扶贫专场'
      },{
        type: '4',
        title: '蔬菜'
      },{
        type: '5',
        title: '水果'
      },{
        type: '6',
        title: '肉类'
      },{
        type: '7',
        title: '红酒'
      }
    ],
    type: 1,
    liveList:[
      {
        anchor:{
          user:{
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/0icB12Tuxt4FUHhuDSVnJTrqSteTX0lglj5V9mI2kYicxeSvM7zWn50UABeXUGK6ewgX9hG6icsR7p2D4hLO5wgXQ/132",
            nickName: '测试直播间测试直播间测试直播间'
          }
        },
        category: {
          id: 5, 
          name: "家装大讲堂", 
          wxapp_id: 10001,
          create_time: "2020-05-29 09:54:15",
          update_time: "2020-05-29 09:54:26",
          wxapp_id: 10001,
        },
        category_id: 5,
        content: "&lt;p style=&quot;font-family: 微软雅黑; padding: 2px 0px 10px; overflow-wrap: break-word; color: rgb(102, 102, 102); text-indent: 2em; white-space: normal;&quot;&gt;&lt;img src=&quot;http://image.haixianglive.cn/20200529134508638275218.jpg&quot; style=&quot;color: rgb(0, 0, 0); font-family: sans-serif;&quot;/&gt;&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;br/&gt;&lt;/p&gt;",
        create_time: "2020-05-29 10:00:29",
        end_time: {text: "2020-05-29 22:00", value: 1590760800},
        text: "2020-05-29 22:00",
        value: 1590760800,
        file_name: "20200515144900d67490840.jpg",
        file_path: "https://i.loli.net/2020/04/26/fKTJNQuBs6AkPE8.jpg",
        file_url: "",
        goods_ids: ["14743", "14658"],
        id: 10048,
        is_delete: 0,
        join_tips: "“中国家装打假第一人”王建老师《家装大讲堂》",
        like_num: 447,
        live_url: "rtmp://91144.livepush.myqcloud.com/live/10048",
        logo_image_id: 36462,
        merch: null,
        merch_id: 0,
        min_viewnum: 307,
        name: "风靡全国的《王建老师家装大讲堂》",
        push_url: "http://walrus.live.vshop365.cn/live/10048.m3u8",
        show_tips: 1,
        start_time: {
          text: "2020-05-29 05:00", 
          value: 1590699600
        },
        text: "2020-05-29 05:00",
        value: 1590699600,
        status: {text: "直播结束", value: 30},
        text: "直播结束",
        value: 10,
        type: 10,
        update_time: "2020-06-01 12:34:41",
        video_image_id: 36462,
        view_num: 0,
        wxapp_id: 10001,
      }
    ]
  },

  onLoad: function (options) {
    let that =this;
    that.setData({
      pageShow: true
    })
  },

  onShow: function () {

  },
  skipPage(e){
    let that = this;
    let { url } = e.currentTarget.dataset;
    METHODS.$navigationTo(url);
  },
  navChoose(e){
    let that = this;
    let { type } = e.currentTarget.dataset;
    that.setData({
      type
    })
  },
  setLikeNum(params){
    let that = this;
    !!params.length && params.map((v,k) => {
      if(v.like_num>10000){
        v['like_num_show'] = (v.like_num/10000).toFixed(1) + 'W'
      }else{
        v['like_num_show'] = v.like_num
      }
    })
    return params
  },
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})