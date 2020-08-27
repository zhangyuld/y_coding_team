const App = getApp();
const METHODS = require('./methods.js').default;

let throttle = true
let liveTImer; //点赞清除的定时器
let heartTimer; //点赞清除的定时器
let getZanTime = 5000 //点赞的请求间隔
let getChatTimer; //获取直播间人数的定时器
let getRoomTime = 5000 //获取直播间人数的请求间隔

let SocketTask;

const utils = require('./util.js');
var moment = require('moment');
const RongEmoji = require('../utils/rongIM/RongIMEmoji-2.2.6.js');
RongEmoji.init();

let init = function(that,params){
  let { chatCount } = params;
  let url= `wss://chat.vshop365.cn/wss:7272`
  SocketTask = wx.connectSocket({url});
  SocketTask.onOpen(res => {
    that.data.socketOpen = true;
    console.log('监听 WebSocket 连接打开事件。', res)
    let data = {
      type: "login",
      chatCount: chatCount,
    }
    //addSysNotes(that);
    getChatInfo(that,'first');
    userEnter(that);
    sendTxtMessage(that,data);
    
  })
  SocketTask.onError(onError => {
    console.log('监听 WebSocket 错误。错误信息', onError)
    that.data.socketOpen = false
  })
  SocketTask.onClose(onClose => {
    console.log('监听 WebSocket 连接关闭事件。', onClose)
    that.data.socketOpen = false;
  })
  SocketTask.onMessage(onMessage => {
    let message = JSON.parse(onMessage.data);
    if(message.type == "ping"){return false}
    message && console.log('服务器返回的消息',message);
    formatMsg(that,message);
  })
}
function formatMsg(that,message){
  switch(message.content?.msg_type || message.type){
    case "S:text":
      addTextMessage(that,message,'textMsg')
    break;
    case "S:redPacket":
      // 红包消息''
      addRedPacket(that,message,'redMsg')
    break;
    case "S:liveOpen":
      // 开启直播
      addBreakMsg(that,message.sendTime, "open");         
    break;
    case "S:liveBreak":
      // 断开直播
      addBreakMsg(that,message.sendTime, "break");         
    break;
    case "S:order":
      // 下单消息
      addOrderMsg(that,message, "order");      
    break;
    case "S:sendGift":
      // 礼物消息
      addGiftMsg(that,message, "giftMsg");
    break;
    case "S:enter":
      // 进入消息
      addEnterMsg(that,message, "enterMsg");
    break;
    case "chat_log":
      // 无content的消息
      console.log(message.chat_log)
      message.chat_log.length && setHistoryMsg(that,message.chat_log.reverse())
    break;
  }
}
//通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
function sendTxtMessage(that,data) {
  let { appKey,chatRoomId } = that.data;
  let user = wx.getStorageSync('user');
  let user_id = wx.getStorageSync('user_id');
  data["user_name"] = user.nickName;
  data["logo"] = user.avatarUrl;
  data["user_key"] = `${appKey}_${user_id}`;
  data["appKey"] = appKey;
  data["room_id"] = chatRoomId;

  //console.log('通过 WebSocket 连接发送数据', JSON.stringify(data))
  SocketTask.send({
    data: JSON.stringify(data),
  })
}
function setHistoryMsg(that,list){
  list.map(v => {
    let message = JSON.parse(v.content);
    formatMsg(that,message);
  })
}


// 防止重复点击
function singleClick(that,fn,timeout=500){
  if(throttle){
    fn();
  }else{
    return false;
  }
  throttle = false
  setTimeout(() => {
    throttle = true
  },timeout)
}

// 格式化表情
function formatEmojis() {
  let list = RongEmoji.list;
  return utils.sliceArray(list, {size: 26});
};

// 处理点赞数
function setLikeNum(that,num,addnum=0){
  let zanNumShow = num + addnum*1;
  if(zanNumShow>10000){
    zanNumShow = (zanNumShow/10000).toFixed(1) + 'W'
  }
  that.setData({
    zanNumShow: zanNumShow
  })
};

// 获取到聊天室在线人数信息
function getChatInfo(that,time){
  if(time == 'first'){
    METHODS.$http(
      {url: "live.live_room/getChatUserNum",data:{charRoomId: that.data.live_id}}
    ).then(result => {
      that.setData({
        userTotalNums:result.num,
      })
    })
  }else{
    getChatTimer = setInterval(()=>{
      METHODS.$http(
        {url: "live.live_room/getChatUserNum",data:{charRoomId: that.data.live_id}}
      ).then(result => {
        that.setData({
          userTotalNums:result.num,
        })
      })
    },getRoomTime)
  }
};
// 获取主播信息
function getAnchor(that,anchor_id){
  METHODS.$http(
    {url: "live.anchor/detail",data:{anchor_id}}
  ).then(result => {
    that.setData({
      anchor: result
    })
  })
};

// 主播关注
/**
 * @name  关注主播
 * @param anchor_id 主播的id
 * @param focus 调用的接口类型: 
 * @description cancelFocus:取消;focus:关注
 */
function anchorFouce(that,e){
  singleClick(that,function(){
    let { focus,anchor_id } = e.currentTarget.dataset;
    METHODS.$http(
      {url: 'live.anchor/'+focus,data:{anchor_id}}
    ).then(result => {
      //console.log(fouce)
      let text = focus == "focus" ? "关注成功" : "取消成功";
      METHODS.$showSuccess(text)
      let { anchor } = that.data;
      anchor['is_fans'] = !anchor['is_fans']
      that.setData({
        anchor
      })
    })
  })
}

// 获取二维码
function getQrcode(that) {
  METHODS.$http(
    {url: "live.live_room/poster",data:{ live_id: that.data.chatRoomId, }}
  ).then(result => {
    that.setData({
      qrcode : result.qrcode
    })
  })
};

// 记录用户进入直播间
function userEnter(that) {
  METHODS.$http(
    {url: "live.live_room/userEnter",data:{ 
      live_id: that.data.chatRoomId,
      invitor_id: that.data.invitor_id
    }}
  )
};

//获取排行榜 
function getInvitorRank(that) {
  METHODS.$http(
    {url: "live.live_room/invitorRank",data:{ 
      live_id: that.data.chatRoomId
    }}
  ).then(result => {
    that.setData({
      rankList : result.list
    })
  })
};

//倒计时
function handleCountDownCancel(that,dataInfo) {
  let countDown = generateCountDown(dataInfo);
  if (dataInfo > 0 && countDown.countDownSeconds>0) {
    liveTImer = setInterval(() => {
      that.setData({
        countDown
      });
    }, 1000)
  }else{
    that.setData({
      countDown
    });
  }
};
// 计算时分秒
function generateCountDown(time_expire) {
  let countDownSeconds = (moment.unix(time_expire).diff(moment(), 'seconds')) * 1000;
  // 将时间差（毫秒）格式为：天时分秒
  let daysRes = parseInt(countDownSeconds / (1000 * 60 * 60 * 24));
  let hoursRes = parseInt((countDownSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutesRes = parseInt((countDownSeconds % (1000 * 60 * 60)) / (1000 * 60));
  let secondsRes = parseInt((countDownSeconds % (1000 * 60)) / 1000);

  let days = formatNum(daysRes);
  let hours = formatNum(hoursRes);
  let minutes = formatNum(minutesRes);
  let seconds = formatNum(secondsRes);
  return { days, hours, minutes, seconds, countDownSeconds };
};
// 格式化时间
function formatNum(parmas){
  if(parmas < 0){
    parmas = 0
  }else if(parmas<10){
    parmas = '0' + parmas;
  }
  return parmas
};




// 发送文本消息
function sendTextMessage(that){
  var commentVal = that.data.commentVal;
  if(!commentVal){
    METHODS.$showMsg('请输入评论内容')
    return false;
  }
  initTextMessage(that,commentVal);
};

// 发送文字消息
function initTextMessage(that,value){
  singleClick(that,function(){
    let content = {
      type: "say",
      content: value,
      msg_type: 'S:text',
    }
    sendTxtMessage(that,content)
    that.setData({
      chatStatus: false,
      emojiContent: '',
      commentVal: ''
    })
    return false
    METHODS.$http(
      {url: "live.live_room/contentCheck",data:{ content: value, }}
    ).then(result => {
      if(result.errcode == 0){

      }else{
        METHODS.$showMsg('发送内容含有违法违规内容,请检查后重新发送')
      }
    })
  })
}
// 进入聊天室的系统公告
function addSysNotes(that) {
  let { show_tips, join_tips } = that.data.liveDetail;
  if(show_tips == 1){
    setTimeout(() => {
      let content = {
        content: join_tips,
        msgType: 'sysNote'
      }
      let chatList = that.data.chatList;
      chatList.push(content)
      that.setData({
        chatList,
      },() => {
        scrollBtm(that)
      })
    }, 200)
  }
};
 // 根据获取到的流数据,同步页面渲染
// 文字消息
function addTextMessage(that,msg,msgType){
  let content = msg.content;
  content["msgType"] = msgType;
  let chatList = that.data.chatList;
  
  chatList.push(content);
  that.setData({
    chatList,
  },() => {
    scrollBtm(that)
  })
};

// 红包消息
function addRedPacket(that,msg,msgType){
  const nowTime = moment().valueOf();
  let timeDiff = nowTime - msg.sendTime*1000;
  if(timeDiff < 30000){
    let content = msg.content;
    let chatList = that.data.chatList;
    let hbList = that.data.hbList;
    content['msgType'] = msgType;
    chatList.push(content);
    hbList.push(content);
    that.setData({
      chatList,
      hbList
    },() => {
      scrollBtm(that)
    })
  }
}

// 断开连接消息
function addBreakMsg(that,time,msgType){
  const nowTime = moment().valueOf();
  let timeDiff = nowTime - time*1000;
  let liveMask = false;
  if(timeDiff < 30000){
    let { liveDetail } = that .data;
    liveDetail.status.value  = msgType == 'open'? 30 : 10;
    if(msgType == 'open'){
      that.livePlayer && that.livePlayer.play()
      liveDetail.status.value = 30;
      liveMask = false;
    }else{
      that.livePlayer && that.livePlayer.stop()
      liveDetail.status.value = 10;
      liveMask = true;
    }
    that.setData({
      liveDetail,
      liveMask
    })
  }
};
// 进入直播间的消息
function addEnterMsg(that,msg,msgType=''){
  let content = {};
  let chatList = that.data.chatList;
  content = msg.content;
  content['msgType'] = msgType;
  chatList.push(content);
  that.setData({
    chatList,
  },() => {
    scrollBtm(that)
  })
}
// 用户下单的消息
function addOrderMsg(that,msg,msgType){
  let content = msg.content;
  let { chatOrder } = that.data;
  chatOrder.push(content);
  that.setData({
    chatOrder,
  })
}
//用户送礼消息
function addGiftMsg(that,msg,msgType){
  let content = {};
  let chatList = that.data.chatList;
  const nowTime = moment().valueOf();
  let timeDiff = nowTime - msg.sendTime*1000;
  if(timeDiff < 10000){
    content = msg.content;
    content['msgType'] = msgType;
    chatList.push(content);
    that.setData({
      chatList,
    },() => {
      scrollBtm(that)
    })
  }
}

// 滚动到聊天底部
function scrollBtm(that){
  let chatList = that.data.chatList;
  let scrollView = 'chat'+ (chatList.length-1)
  that.setData({
    scrollView
  })
}

// 点击红包弹窗
function hbOpen(that,e,type='horizontal'){
  let hb_info = {};
  if(type == 'horizontal'){
    let index = e.currentTarget.dataset.index;
    hb_info = that.data.chatList[index];
  }else{
    hb_info = that.data.hbList[0];
  }
  let user_address = wx.getStorageSync('user_address')
  // 判断是否可以领取
  if(hb_info.city != user_address && hb_info.city != ''){
    wx.showModal({
      title: '温馨提示',
      content: '限'+ hb_info.city +'地区领取',
      showCancel: false,
      success(res){

      }
    })
    return false;
  }
  that.setData({
    hb_info: hb_info,
    hbOpenShow: true,
    maskShow: true,
  })
};
// 移除红包
function removeHbIndex(that,e){
  let { hbList } = that.data;
  hbList.shift(1);
  that.setData({
    hbList
  })
};
// 红包领取详情
function hbGetOpen(that,type='horizontal'){
  let redpacket_id = that.data.hb_info.redpacket_id;
  that.setData({
    packet_money:0,
    packetUserList:{},
  })
  METHODS.$http(
    { url: "live.red_packet/snatch",
      data:{ packet_id: redpacket_id },
      fail(){
        hbGetList(that,type);
      },
      complete(){
        removeHbIndex(that)
      }
    }
  ).then(result => {
    that.setData({
      packet_money:result.money,
    })
     // 红包记录
    hbGetList(that,type);
  })
};
// 获取红包领取记录
function hbGetList(that,type){
  let redpacket_id = that.data.hb_info.redpacket_id;
  let chatList = that.data.chatList;
  if(type == 'horizontal'){
    chatList.map((v,k)=>{
      if(redpacket_id ==v.redpacket_id){
        v.hasGet = true
        return false;
      }
    })
  }
  METHODS.$http(
    {url: "live.red_packet/snatchLog",data: {packet_id: redpacket_id}}
  ).then(result => {
    that.setData({
      chatList,
      packetUserList:result.list.data,
      hbOpenShow: false,
      hbInfoShow: true,
      maskShow: true,
    })
  })
};
// 点赞
function addHeart(that){
  let { heart_list } = that.data;
  heart_list.push('1');
  that.setData({
    heart_list
  })
  countZanNum(that);
};
// 计算点赞数
function countZanNum(that){
  let { zanNum,addZanNum } = that.data;
  addZanNum++;
  that.data.addZanNum = addZanNum;
  setLikeNum(that,zanNum,addZanNum);
  clearTimeout(heartTimer)
  getZanNum(that)
};
// 获取点赞数
function getZanNum(that){
  heartTimer = setInterval(function(){
    that.setData({
      heart_list: [],
    },() => {
      postZanNum(that);
    })
  },getZanTime)
};
// 发送点赞数据
function postZanNum(that){
  let { addZanNum,zanNumShow } = that.data;
  METHODS.$http(
    { url: "live.live_room/addLike",data:{
      live_id: that.data.chatRoomId,
      like_num: addZanNum
    } }
  ).then(result => {
    that.setData({
      zanNum: zanNumShow > result.like_num ? zanNumShow : result.like_num ,
      addZanNum: '0',
    },() =>{
      setLikeNum(that,result.like_num);
    })
  })
}

// 离开直播间
function outRoom(that){
  clearInterval(liveTImer);
  clearInterval(heartTimer);
  clearInterval(getChatTimer);
  // 取消屏幕常亮
  wx.setKeepScreenOn({
    keepScreenOn: false
  })
  SocketTask.close({
    code: "1000",
    reason: "离开页面",
    success(){
      postZanNum(that);
    },
    fail(){}
  })
}

// 送礼部分
// 选择礼物
function prizeChoose(that,e){
  let { liveDetail } = that.data;
  let { index } = e.currentTarget.dataset;
  let gift_choose = {};
  liveDetail.gifts?.map((v,k) => {
    if(k == index){
      v.active = true;
      gift_choose = v;
    }else{
      v.active = false;
    }
  })
  that.setData({liveDetail,gift_choose})
  getPrizeTotal(that)
}
// 礼物加减
function prizeNumHandle(that,e){
  let { prizeNum } = that.data;
  let { type } = e.currentTarget.dataset;
  if(type == 'del'){
    prizeNum = prizeNum > 1 ? prizeNum - 1 : prizeNum
  }else{
    prizeNum++
  }
  that.setData({prizeNum})
  getPrizeTotal(that)
}
//计算礼物总数
function getPrizeTotal(that){
  let { gift_choose, prizeNum,prizeTotal } = that.data;
  if(!gift_choose){return false;}

  let price = gift_choose.points;;
  prizeTotal = ((price*100 * prizeNum)/100).toFixed(2)
  that.setData({prizeTotal})
}
//礼物赠送
function priceSend(that,e){
  let { user,liveDetail,gift_choose,prizeTotal,anchor,prizeNum } = that.data;
  if(!gift_choose){
    METHODS.$showMsg('请选择礼物!')
    return false
  };
  if(user.points < prizeTotal){
    let pointsDiff = prizeTotal-user.points
    wx.showModal({
      title: '积分不足',
      content: `积分不足,还需重置${pointsDiff}积分`,
      confirmText: '去充值',
      success(res){
        if(res.confirm){
          wx.navigateTo({
            url: `/pages/live/prizeCharge/prizeCharge?num=${pointsDiff}`,
          })
        }
      }
    })
  }else{
    METHODS.$http(
      {url: "live.live_room/sendGift",data:{
        live_id: that.data.chatRoomId,
        live_name: liveDetail.name,
        anchor_id: anchor.id,
        gift_id: gift_choose.id,
        num: prizeNum,
      }}
    ).then(result => {
      METHODS.$showSuccess('赠送成功!')
      user.points = user.points - prizeTotal;
      that.setData({user})
      that.prizeHandle()
    })
  }
}


module.exports = {
  init,                   //socket初始化
  sendTxtMessage,         // 发送消息
  singleClick,            // 防止重复点击
  formatEmojis,           // 格式化表情
  setLikeNum,             // 处理点赞数
  getChatInfo,            // 获取到聊天室在线人数信息
  getAnchor,              // 获取主播信息
  anchorFouce,            // 主播关注
  getQrcode,              // 获取二维码
  userEnter,              // 记录用户进入直播间
  getInvitorRank,         //获取排行榜 
  handleCountDownCancel,  //倒计时
  generateCountDown,      // 计算时分秒
  formatNum,              // 格式化时间

  addSysNotes,            // 添加系统消息
  sendTextMessage,        // 发送文本消息
  initTextMessage,        // 初始化文字消息

  addTextMessage,         // 文字消息
  addRedPacket,           // 红包消息
  addBreakMsg,            // 断开连接消息
  scrollBtm,              // 滚动到聊天底部
  hbOpen,                 // 点击红包弹窗
  removeHbIndex,          // 移除红包
  hbGetOpen,              // 红包领取详情
  hbGetList,              // 获取红包领取记录
  addHeart,               // 点赞
  countZanNum,            // 计算点赞数
  getZanNum,              // 获取点赞数
  postZanNum,             // 发送点赞数据
  outRoom,                // 离开直播间
  prizeChoose,            // 选择礼物
  prizeNumHandle,         // 礼物加减
  priceSend,              // 礼物赠送
}