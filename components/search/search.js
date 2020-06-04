const App = getApp();
const METHODS = require("../../utils/methods.js").default;
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    model: {
      type: String,
      value: "1"
    },
    value: {
      type: String,
      value: ""
    },
    place: {
      type: String,
      value: "请输入..."
    },
    url: {
      type: String,
      value: ""
    },
    position: {
      type: Boolean,
      value: false
    },
    background: {
      type: String,
      value: ''
    },
    nav: {
      type: Boolean,
      value: false
    },
    input: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 私有数据, 组件的初始数据
   * 可用于模版渲染
   */
  data: {},
  /**
   * 组件生命周期
   * created: 组件创建完毕
   * attached: 组件被挂载到页面节点树
   * detached: 组件被销毁
   */
  lifetimes: {
    created: function() {},
    attached: function() {
      this.setData({
        searchKey: this.data.value
      })
    },
    detached: function() {},
    
  },
  observers: {
    'value': function(value) {
      this.setData({
        searchKey: value
      })
    }
  },
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    onInput(e){
      let that = this;
      that.setData({
        searchKey: e.detail.value,
      })
      that.data.input && that.triggerEvent('searchInput',e.detail.value);
    },
    cancel(e){
      let that = this;
      that.setData({
        searchKey: '',
      })
    },
    onConfirm(e){
      let that = this;
      if(that.data.url){
        METHODS.$navigationTo(that.data.url)
        that.setData({
          searchKey: '',
        })
      }else{
        let { searchKey } = that.data;
        that.triggerEvent('searchConfirm',searchKey);
      }
    }
  }
});
