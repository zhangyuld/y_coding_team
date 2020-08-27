/*
 * @Date         : 2020-06-06 18:44:07
 * @LastEditors  : zhangyu
 * @LastEditTime : 2020-07-17 09:48:26
 * @Description  : 
 */ 
import METHODS from "./utils/methods.js";

App({
  onLaunch: async function (e) {
    let that = this;
    that.updateManager(); //更新小程序
    this.onStartupScene(e.query); //小程序启动场景值获取
  },
  globalData: {
    userInfo: null,
  },
  onStartupScene(query) {
    console.log(query)
    // 获取场景值
    let scene = METHODS.$getSceneData(query);
    // 记录推荐人id
    let invitorId = query.invitor_id ? query.invitor_id : scene.uid;
    let merchid = query.merchid ? query.merchid : scene.merchid;
    let rid = query.rid ? query.rid : scene.rid;
    invitorId > 0 && (this.saveInvitorId(invitorId));
    merchid > 0 && (this.saveMerchId(merchid));
    rid > 0 && (this.saverId(rid));
  },
  saveInvitorId(invitorId) {
    if (!wx.getStorageSync('invitor_id'))
      wx.setStorageSync('invitor_id', invitorId);
  },

  // 记录当前商户信息
  saveMerchId(merchid) {
    if (!wx.getStorageSync('merch_id') && merchid)
      wx.setStorageSync('merch_id', merchid);
  },

  // 记录邀请开通主播的功能
  saverId(rid){
    if (!wx.getStorageSync('rid') && rid)
      wx.setStorageSync('rid', rid);
  },
  /**
   * 小程序主动更新
   */
  updateManager() {
    if (!wx.canIUse('getUpdateManager')) {
      return false;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    });
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，即将重启应用',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      });
    });
    updateManager.onUpdateFailed(function() {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
  },
})
