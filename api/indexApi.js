/*
 * @Date         : 2020-07-18 11:46:37
 * @LastEditors  : zhangyu
 * @LastEditTime : 2020-08-12 19:14:00
 * @Description  : 
 */ 
import METHODS from "../utils/methods.js";

import indexApi from "./index.api.js";

let apiJs = [indexApi]
apiJs.forEach(v => {
  Object.entries(v).forEach(v1 => {
    module.exports[v1[0]] = v1[1];
  })
})
