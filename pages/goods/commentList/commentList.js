const App = getApp();
const METHODS = require("../../../utils/methods.js").default;
import { $comment } from "../../../api/indexApi.js";
Page({
  data: {
    comment_count: [
      {
        type: '-1',
        title: '全部'
      },{
        type: '10',
        title: '好评'
      },{
        type: '20',
        title: '中评'
      },{
        type: '30',
        title: '差评'
      },
    ],
    list: [],
    page: 1,
    // 页面参数
    options: {
      goods_id: null,
      scoreType: -1
    },
  },
  onLoad: function (opt) {
    let that = this;
    let options = that.data.options;
    options.goods_id = opt.goods_id
    if(opt.type){
      options.scoreType = opt.type
    }
    // 记录页面参数
    that.setData({
      options
    }, ()=>{
      // 获取评论列表
      that.getCommentList();
    });
  },
  onShow: function () {},
  /**
   * 获取评论列表
   */
  async getCommentList(isPage) {
    let that = this;
    let data = that.data.options;
    data.page = that.data.page || 1;

    let result = await $comment.list(data);
    if(result === false){ return false; }

    let resList = result.list,
        dataList = that.data.list;
    if (isPage == true) {
      dataList.data =  dataList.data.concat(resList.data)
    } else {
      dataList = resList;
    }
    let total = result.total;
    let comment_count = that.data.comment_count;
    Object.entries(total).map((v,k) => {
      comment_count[k].text = v[0]
      comment_count[k].value = v[1]
    })
    that.setData({
      comment_count,
      list: dataList,
      pageShow: true,
      disabled: false,
    });
  },
  /** 
   * 点击tab切换 
   */
  navChoose(e) {
    let that = this;
    if(that.data.disabled){ return false }
    that.setData({
      disabled: true,
      page: 1,
      'options.scoreType': e.currentTarget.dataset.type
    }, function() {
      // 获取评论列表
      that.getCommentList();
    });
  },
  /**
   * 图片预览
   */
  previewImages: function(e) {
    let that = this;
    let { index,idx } = e.currentTarget.dataset;
    let list = that.data.list;
    let  imageUrls = [];

    list.data[index].image.forEach(function(item) {
      imageUrls.push(item.file_path);
    });
    wx.previewImage({
      current: imageUrls[idx],
      urls: imageUrls
    })
  },
  onPullDownRefresh: function () {},
  onReachBottom(){
    let that = this;
    // 已经是最后一页
    if (that.data.page >= that.data.list.last_page) {
      return false;
    }
    // 加载下一页列表
    this.data.page++;
    this.getCommentList(true);
  },
});
