const App = getApp();
import METHODS from "../../utils/methods.js";
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    // styleIsolation: 'apply-shared',
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    list:{
      type: Array,
      value: [],
    },
    row: {
      type: Number,
      value: ''
    }
  },
  /**
   * 私有数据, 组件的初始数据
   * 可用于模版渲染
   */
  data: {
    itemRatio: 0,
  },
  /**
   * 组件生命周期
   * created: 组件创建完毕
   * attached: 组件被挂载到页面节点树
   * detached: 组件被销毁
   */
  lifetimes: {
    created: function() {},
    attached: function() {
      let that = this;
      let { list,row } = that.data;
      let listLen = list.length;
      let itemRatio = 4;
      if(!!row){
        itemRatio = row;
      }else{
        if(listLen%4 == 0){
          itemRatio = 4
        }else if(listLen%5 == 0){
          itemRatio = 5
        }
      }
      that.setData({
        itemRatio
      })
    },
    detached: function() {}
  },
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    toPath(e){
      METHODS.$navigationTo(e)
    }
  }
});
