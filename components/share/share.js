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
    status:{
      type: Boolean,
      value: false,
    },
    code: {
      type: String,
      value: '',
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
    attached: function() {},
    detached: function() {}
  },
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    shareHandle(e){
      let that = this;
      let { type } = e.currentTarget.dataset;
      console.log(type)
      switch (type){
        case 'choose':
          that.setData({
            status: true
          })
          break;
        case 'poster': 
          if(that.data.code){
            that.setData({
              status: false,
              posterShow: true,
            })
          }else{
            wx.showToast({
              title: '暂无海报!',
              icon: 'none',
              success(){
                that.setData({
                  status: false,
                  posterShow: false,
                })
              }
            })
          }
          break;
        case 'close': 
          that.setData({
            status: false,
            posterShow: false,
          })
          break;
      }
    }
  }
});
