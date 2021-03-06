const App = getApp();
Component({
  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    is_show: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: "",
    },
    content: {
      type: String,
      value: "",
    },

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
    attached: function() {},
    detached: function() {},
    
  },
  //observers: {
  //  'is_show': function(is_show) {
  //    this.setData({
  //      searchKey: value
  //    })
  //  },
  //  "content" :function(content){
  //    this.setData({
  //      content: value
  //    })
  //  }
  //},
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    ruleHandle(){
      let that = this;
      that.setData({
        is_show: false
      })
    }
  }
});
