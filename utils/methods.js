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
let $requestApi =  $promisify(wx.request);


let $host = 'https://gep.vshop365.cn/api/'

let $tabBarLinks = [
  'pages/index/index',
  'pages/sort/sort',
  'pages/cart/cart',
  'pages/mine/mine'
]

let $saveRefereeId = function(refereeId) {
  if (!wx.getStorageSync('referee_id'))
    wx.setStorageSync('referee_id', refereeId);
}

// 获取场景值(scene)
let $getSceneData = function(query) {
  return query.scene ? util.scene_decode(query.scene) : {};
}

// 执行用户登录
let $doLogin = function() {
  wx.showModal({
    content: '请先登录后操作！',
    success: (res) => {
      if (res.confirm) {
        // 保存当前页面
        let pages = getCurrentPages();
        if (pages.length) {
          let currentPage = pages[pages.length - 1];
          "pages/login/login" != currentPage.route &&
            wx.setStorageSync("currentPage", currentPage);
        }
        // 跳转授权页面
        wx.navigateTo({
          url: "/pages/login/login"
        });
      }
    }
  })
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
  
  if(checkLogin){
    let confirmLogin = that.$confirmLogin();
    if(!confirmLogin){
      return false;
    }
  }
  if (showLoading) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
  }
  let { 
    url,
    method='GET',
    data={},
    header
  } = opt;
  opt.url = $host + url;
  if(method == "POST" && header == undefined){
    opt.header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  let res =  await $requestApi(opt)
  wx.hideLoading();
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
  $request(url,'GET', data, success, fail, complete)
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
  $request(url, 'POST', data, success, fail, complete)
}

// 请求封装
let $request = function(url, method, data, success, fail, complete) {
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
      content: '请先登录后操作！',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login/login',
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
  let url = e.currentTarget.dataset.url;
  let check = e.currentTarget.dataset.check || false;
  if(check){
    let confirmLogin = that.$confirmLogin();
    if(!confirmLogin){
      return false;
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
  return util.urlEncode(Object.assign({
    referee_id: getUserId()
  }, params));
}

//拨打电话
let $makePhone = function(e){
  var phone = e.currentTarget.dataset.phone;
  wx.makePhoneCall({
      phoneNumber: phone
  });
}

// 上传图片
let $uploadMoreImage = function(sumNumber, add_img, callback){
  var that = this;
  add_img||[]  //已上传图片数组
  // sumNumber 允许上传的总数量
  var photoNum = sumNumber - add_img.length; //剩余可上传数
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

export default {
  $promisify,
  $requestApi,
  $login,
  $tabBarLinks,
  $saveRefereeId,
  $getSceneData,
  $doLogin,
  $showSuccess,
  $showError,
  $http,
  $get,
  $post,
  $request,
  $confirmLogin,
  $navigationTo,
  $getShareUrlParams,
  $makePhone,
  $uploadMoreImage,
  $countDown,
  $wxPayment,
}