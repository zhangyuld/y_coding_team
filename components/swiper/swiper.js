const App = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    banner:{
      type: Array,
      value: [],
    },
    model: {
      type: String,
      value: "1"
    },
    width: {
      type: String,
      value: "750"
    },
    height:{
      type: String,
      value: "200"
    },
    auto:{
      type: Boolean,
      value: false,
    },
    indicator:{
      type: Boolean,
      value: false,
    },
    indicator_active:{
      type: String,
      value: '#ffffff'
    },
    indicator_default:{
      type: String,
      value: 'rgba(255,255,255,.6)'
    }
  },
  /**
   * 私有数据, 组件的初始数据
   * 可用于模版渲染
   */
  data: {
    current: 1,
    current2: 0
  },
  /**
   * 组件生命周期
   * created: 组件创建完毕
   * attached: 组件被挂载到页面节点树
   * detached: 组件被销毁
   */
  lifetimes: {
    created: function() {},
    attached: function() {},
    detached: function() {}
  },
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    swiperChange(e){
      this.setData({
        current: e.detail.current + 1
      })
    },
    swiperChange2(e){
      this.setData({
        current2: e.detail.current
      })
    },
  }
});
