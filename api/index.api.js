/*
 * @Date         : 2020-07-29 09:54:00
 * @LastEditors  : zhangyu
 * @LastEditTime : 2020-08-17 14:34:41
 * @Description  : 
 */ 

import METHODS from "../utils/methods.js";

METHODS.$getData = function(opt){
  return new Promise((resolve,reject) => {
    let data = require(opt.url)
    resolve(data)
  })
}


/**
 * 首页数据
 * @getData 获取首页数据
 */
module.exports.$index = {
  async getData(params){
    let result = await METHODS.$http({
      url: "Home/pageIndex",
      data: params,
    })
    return result;
  }
}
/**
 * 搜索
 * @history 搜索历史
 * @result 搜索结果
 */
module.exports.$search = {
  async history(params){
    let result = await METHODS.$http({
      url: "",
      data: params,
    })
    return result;
  },
  async category(params){
    let result = await METHODS.$http({
      url: "home/categoryList",
      data: params,
    })
    return result;
  },
  async result(params){
    let result = await METHODS.$http({
      url: "home/commonGoodsSearch",
      data: params,
    })
    return result;
  }
}
