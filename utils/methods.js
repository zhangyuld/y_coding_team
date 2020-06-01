/**
 * @name 请先移至最底部查看页面方法内容
 */


const util = require('./util.js');
const QQMapWX = require('./qqmap-wx-jssdk.min.js');
let throttle = true;

let $promisify = function(api) {
  return (opt, ...arg) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, opt, { 
        success: resolve, 
        fail: reject 
      }), ...arg)
    })
  }
}
let $login = $promisify(wx.login);
let $getUserInfo = $promisify(wx.getUserInfo)
let $getImageInfo = $promisify(wx.getImageInfo);
let $saveImageToPhotosAlbum = $promisify(wx.saveImageToPhotosAlbum);
let $requestApi =  $promisify(wx.request);


let $host = 'https://njlb.vshop365.cn/index.php?s=/api/'

let $tabBarLinks = [
  'pages/index/index',
  'pages/sort/sort',
  'pages/cart/cart',
  'pages/mine/mine'
]

// 防止重复点击
let $singleClick = function(fn,params,timeout=500){
  let that = this;
  if(throttle){
    if(typeof fn == 'function'){
      fn();
    }else{
      that[fn](params)
    }
  }else{
    return false;
  }
  throttle = false
  setTimeout(() => {
    throttle = true
  },timeout)
}
// 获取分享者的id
let $saveRefereeId = function(refereeId) {
  if (!wx.getStorageSync('referee_id'))
    wx.setStorageSync('referee_id', refereeId);
}

// 获取场景值(scene)
let $getSceneData = function(query) {
  return query.scene ? util.scene_decode(query.scene) : {};
}


// 显示成功提示框
let $showSuccess = function(msg, callback) {
  wx.showToast({
    title: msg,
    icon: 'success',
    mask: true,
    duration: 1500,
    success() {
      callback && (setTimeout(function() {
        callback();
      }, 1500));
    }
  });
}

// 显示失败提示框
let $showError = function(msg, callback) {
  wx.showModal({
    title: '友情提示',
    content: msg,
    showCancel: false,
    success(res) {
      callback && (setTimeout(function() {
        callback();
      }, 1500));
    }
  });
}


let $http = async function(opt, arg) {
  let that = this;
  let { showLoading=false,checkLogin=false} = arg;
  // 判断是否登录
  if(checkLogin){
    let confirmLogin = that.$confirmLogin();
    if(!confirmLogin){
      return false;
    }
  }
  // 判断是否显示loading
  if (showLoading) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
  }

  // 从opt中结构参数
  let { url, method='GET', data={}, header } = opt;
  // 配置请求地址
  opt.url = $host + url;
  // 获取个人token
  const user_token = wx.getStorageSync("user_token") || '';
  
  // if(method == "POST" && header == undefined){
  //   opt.header = {
  //     'content-type': 'application/json',
  //     Authorization: "Bearer " + user_token,
  //   }
  // }
  // 根据token判断请求头
  if(user_token !== ''){
    opt.header = {
      'content-type': 'application/json',
      Authorization: "Bearer " + user_token,
    }
  }else{
    opt.header = {
      'content-type': 'application/json'
    }
  }
  // 开始请求,只要成功就就会从成功从.then()中截取到,失败为.catch()
  // 数据结构为: res.data:{
  //   code: 1,
  //   data: {},
  //   msg: '',
  // }

  let res = await $requestApi(opt)
  wx.hideLoading();
  if(res.data.code == -1){
    wx.navigateTo({
      url: '/pages/account/authorize/authorize',
    })
    return false
  }
  if(res.data.code == 1){
    return res.data.data
  }else{
    wx.showToast({
      title: res.data.msg,
      icon: 'none',
      mask: false,
    })
    return false
  }
};


let $request = (opt, arg) => {
  let that = this;
  let { showLoading=false,checkLogin=false} = arg;
  // 判断是否登录
  if(checkLogin){
    let confirmLogin = that.$confirmLogin();
    if(!confirmLogin){
      return false;
    }
  }
  
  // 开始promise封装
  return new Promise((resolve, reject) => {
    // 判断是否显示loading
    if (showLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true,
      })
    }

    // 从opt中结构参数
    let { url, method='GET', data={}, header } = opt;
    // 配置请求地址
    opt.url = $host + url;
    // 获取个人token
    const user_token = wx.getStorageSync("user_token") || '';
    
    // if(method == "POST" && header == undefined){
    //   opt.header = {
    //     'content-type': 'application/json',
    //     Authorization: "Bearer " + user_token,
    //   }
    // }
    // 根据token判断请求头
    if(user_token !== ''){
      opt.header = {
        'content-type': 'application/json',
        Authorization: "Bearer " + user_token,
      }
    }else{
      opt.header = {
        'content-type': 'application/json'
      }
    }
    wx.request({
      url: opt.url,
      method: method,
      header: opt.header,
      data: opt.data,
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          // 成功且code=1时抛出
          resolve(res.data.data);
        } else if (res.data.code == -1) {
          // code=-1时,后台判断未登陆
          wx.navigateTo({
            url: "/pages/login/login",
          });
        } else {
          // code=0时做相应提示
          wx.showToast({
            title: res.data.msg,
            icon: "none",
          });
        }
      },
      fail(err) {
        // 失败时抛出
        reject(res)
        wx.hideLoading();
        wx.showToast({
          title: "网络连接失败",
          icon: "none",
        });
      },
    });
  });
};

// get方法
let $get = function(url, data, success, showLoading=false, fail, complete) {
  let that = this;
  // 显示加载内容
  if (showLoading) {
    wx.showLoading({
      title: showLoading,
      mask: true,
    })
  }
  $makeRequest(url,'GET', data, success, fail, complete)
}

// post方法
let $post = function(url, data, success, showLoading=false, fail, complete) {
  let that = this;
  // 显示加载内容
  if (showLoading) {
    wx.showLoading({
      title: showLoading,
      mask: true,
    })
  }
  $makeRequest(url, 'POST', data, success, fail, complete)
}

// 请求封装
let $makeRequest = function(url, method, data, success, fail, complete) {
  let that = this;
  wx.showNavigationBarLoading();
  // 构造请求参数
  data = data || {};
  // data.wxapp_id = getWxappId(); //商城id
  data.token = wx.getStorageSync('token')||'';
  data.user_id = wx.getStorageSync('userId') || '';
  
  wx.request({
    url: $host + url,
    method: method == 'POST' ? 'POST' : 'GET',
    header: {
      "Content-type": method == 'POST' ? "application/x-www-form-urlencoded" : "application/json",
    },
    data: data,
    success(res) {
      if (res.statusCode !== 200 || typeof res.data !== 'object') {
        $showError('网络请求出错');
        return false;
      }
      if (res.data.code === 0) {
        $showError(res.data.msg, function() {
          fail && fail(res);
        });
        return false;
      } else {
        success && success(res.data);
      }
    },
    fail(res) {
      $showError(res.errMsg, function() {
        fail && fail(res);
      });
    },
    complete(res) {
      wx.hideNavigationBarLoading();
      complete && complete(res);
    },
  });
}

// 点击事件的验证登录
let $confirmLogin = function(callback) {
  let that = this;
  let isLogin = wx.getStorageSync('isLogin') || false;
  if (!isLogin) {
    wx.showModal({
      content: '请先授权后操作！',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/account/authorize/authorize',
          })
        }
      }
    })
    return false
  } else {
    callback && callback()
    return true
  }
}

//跳转事件
let $navigationTo = function(e){
  let that = this;
  let url;
  if(typeof e == "string"){
    url = e
  }else{
    url = e.currentTarget.dataset.url;
    let check = e.currentTarget.dataset.check || false;
    if(check){
      let confirmLogin = that.$confirmLogin();
      if(!confirmLogin){
        return false;
      }
    }
  }
  
  if (!url || url.length == 0) {
    console.log('路径正确性校验')
    return false;
  }
  // tabBar页面
  if ($tabBarLinks.indexOf(url) > -1) {
    wx.switchTab({
      url: '/' + url
    });
  } else {
    // 普通页面
    wx.navigateTo({
      url: '/' + url
    });
  }
}

// 获取分享参数
let $getShareUrlParams = function(params) {
  let that = this;
  // return util.urlEncode(Object.assign({
  //   referee_id: getUserId()
  // }, params));
}

//拨打电话
let $makePhone = function(e){
  let phone = e.currentTarget.dataset.phone;
  wx.makePhoneCall({
      phoneNumber: phone
  });
}

// 上传单张图片
let $uploadImage = function(img,callback){
  wx.showLoading({
    title: '上传中',
  })
  wx.uploadFile({
    url: $host + 'user/uploadImg',
    filePath: img,
    name: 'image',
    header: {
      "Content-type": "multipart/form-data",
      'Authorization': 'Bearer ' + wx.getStorageSync('user_token')
    },
    success: function (res) {
      console.log(res)
      wx.hideLoading();
      let data = JSON.parse(res.data)
      if(data.code == 1){
        callback && callback(data)
      }else{
        wx.showToast({
          title: data.msg,
          icon: 'none',
          mask: true
        })
      }
    },
    fail: function (err) {console.log(err)},
    complete: function (res) { },
  })
}

// 上传多张图片
let $uploadMoreImage = function(sumNumber, add_img, callback){
  let that = this;
  add_img||[]  //已上传图片数组
  // sumNumber 允许上传的总数量
  let photoNum = sumNumber - add_img.length; //剩余可上传数
  if (photoNum == 0) {
    wx.showToast({
      title: `最多上传${sumNumber}张图片`,
      icon: 'none',
      duration: 1500,
    })
    return;
  }
  wx.chooseImage({
    count: photoNum,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      console.log(res)
      // tempFilePath可以作为img标签的src属性显示图片
      let tempFilePaths = res.tempFilePaths
      let temLength = tempFilePaths.length;
      let number = 0;
      for (let i = 0, h = temLength; i < h; i++) {
        wx.showLoading({
          title: '上传中',
          mask: true,
        })
        wx.uploadFile({
          url: $host + 'common/uploadimg',
          filePath: tempFilePaths[i],
          name: 'file',
          success: function (res) {
            console.log(res)
            number++;
            if (number == h) {
              wx.hideLoading();
            }
            res = JSON.parse(res.data);
            add_img.push(res.filesrc);
           
            callback && callback(add_img)
          },
          fail: function (err) {console.log(err)},
          complete: function (res) { },
        })
      }
    }
  })
}

//小于10的格式化函数
let $numFormat = function(param) {
  return param < 10 ? '0' + param : param;
}
// 倒计时
let $countDown = function(endTime){
  // 获取当前时间，同时得到活动结束时间数组
  let newTime = new Date().getTime() / 1000;
  let obj = {};
  if (endTime - newTime > 0) {
    let time = (endTime - newTime);
    // 获取天、时、分、秒
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600);
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    obj = {
      day: $numFormat(day),
      hou: $numFormat(hou),
      min: $numFormat(min),
      sec: $numFormat(sec)
    }
  } else {//活动已结束，全部设置为'00'
    return false;
  }
  return obj;
}

// 微信支付
let $wxPayment = function(option) {
  let options = Object.assign({
    payment: {},
    success: () => {},
    fail: () => {},
    complete: () => {},
  }, option);
  wx.requestPayment({
    timeStamp: options.payment.timeStamp,
    nonceStr: options.payment.nonceStr,
    package: 'prepay_id=' + options.payment.prepay_id,
    signType: 'MD5',
    paySign: options.payment.paySign,
    success(res) {
      options.success(res);
    },
    fail(res) {
      options.fail(res);
    },
    complete(res) {
      options.complete(res);
    }
  });
}

// 逆解析地址
let $getUserAddress = function(){
  let that = this
  let qqmapsdk = new QQMapWX({
    key: 'KUTBZ-7MFCP-5RUDQ-VXJ7V-CUIIE-46B65'
  });
  wx.getLocation({
    type: 'gcj02',
    success (res) {
      const latitude = res.latitude;
      const longitude = res.longitude;
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function (res) {
          if(res.message === "query ok"){
            wx.setStorageSync('address_info', res.result)
          }else{
            wx.showToast({
              title: '获取地址失败',
              icon: 'none',
              mask: true
            })
          }
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          // console.log(res);
        }
      });
    },
  })
}

//角度转弧度
let $getRad = function(d){
  //console.log(d)
  return d * Math.PI / 180.0;
}
//根据两个经纬度获取他们之间的距离
let $getDistance = function(position1, position2){
  let that = this;
  let lat1 = position1.lat;
  let lng1 = position1.lng;
  let lat2 = position2.lat;
  let lng2 = position2.lng;
  let EARTH_RADIUS = 6378137.0; //单位M
  let PI = Math.PI;
  let radLat1 = that.$getRad(lat1);
  let radLat2 = that.$getRad(lat2);

  let a = radLat1 - radLat2;
  let b = that.$getRad(lng1) - that.$getRad(lng2);

  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000.0;

  return s;
}

export default {
  $promisify,                 //官方提供的promisify
  $requestApi,                //将wx.request进行promisify化
  $login,                     //将wx.login进行promisify化
  $getUserInfo,               //将wx.getUserInfo进行promisify化
  $getImageInfo,              //将wx.getImageInfo进行promisify化
  $saveImageToPhotosAlbum,    //将wx.gsaveImageToPhotosAlbum进行promisify化
  $tabBarLinks,               //当前小程序的tabbar页面路径
  $singleClick,               //节流器,默认每500ms点击一次
  $saveRefereeId,             //获取分享者的id
  $getSceneData,              //获取场景值(scene)
  $showSuccess,               //成功的toast提示
  $showError,                 //失败的modal提示
  $http,                      //promisify化的request请求,抛出位置无法定义
  $request,                   //Promise化的request请求,可以定义抛出,仅code=1时抛出数据
  $get,                       //简单的get请求封装,已启用,请使用$http或$request
  $post,                      //简单的post请求封装,已启用,请使用$http或$request
  $makeRequest,               //根据get/post传入不同开始请求
  $confirmLogin,              //判断登陆
  $navigationTo,              //导航跳转,可判断tabbar跳转
  $getShareUrlParams,         //获取风向参数
  $makePhone,                 //拨打电话
  $uploadImage,               //简单的单张图上传
  $uploadMoreImage,           //多张图的上传,暂不使用,后续优化
  $numFormat,                 //格式化时间样式
  $countDown,                 //根据传入的截止时间倒计时
  $wxPayment,                 //微信支付
  $getUserAddress,            //获取用户地址并反解析
  $getRad,                    //角度转弧度
  $getDistance                //计算两个经纬度之间的距离
}