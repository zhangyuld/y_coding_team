# y_coding_team

## 这是一个项目初始的框架

## 后期会添加一写处理好的模板和组件化

### js 的使用方法

1、简单全局的使用：

app.js 中引用 methods.js  
METHODS: require('/utils/methods.js').default

在相应页面中  
页面头部：const app = getApp()  
使用的位置：app.METHODS.$http(...)即可


2、页面的按需引用

在页面中  
import METHODS from "/utils/methods.js';
使用的位置：METHODS.$http(...)即可

3、现有的封装方法  

官方提供的promisify  
$promisify

将wx.request进行promisify化  
$requestApi

将wx.login进行promisify化  
$login

将wx.getUserInfo进行promisify化
$getUserInfo

将wx.getImageInfo进行promisify化  
$getImageInfo

将wx.gsaveImageToPhotosAlbum进行promisify化  
$saveImageToPhotosAlbum

当前小程序的tabbar页面路径  
$tabBarLinks

节流器,默认每500ms点击一次  
$singleClick

获取分享者的id  
$saveRefereeId

获取场景值(scene)  
$getSceneData

成功的toast提示  
$showSuccess

失败的modal提示  
$showError

Promise化的request请求,可以定义抛出,仅code=1时抛出数据  
$http

简单的get请求封装,已启用,请使用$http或$request  
$get

简单的post请求封装,已启用,请使用$http或$request  
$post

根据get/post传入不同开始请求  
$makeRequest

判断登陆  
$confirmLogin

导航跳转,可判断tabbar跳转  
$navigationTo

获取风向参数  
$getShareUrlParams

拨打电话  
$makePhone

简单的单张图上传  
$uploadImage

多张图的上传,暂不使用,后续优化  
$uploadMoreImage

格式化时间样式  
$numFormat

根据传入的截止时间倒计时  
$countDown

微信支付  
$wxPayment

获取用户地址并反解析  
$getUserAddress

角度转弧度  
$getRad

计算两个经纬度之间的距离  
$getDistance


