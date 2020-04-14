# y_coding_team

## 这是一个项目初始的框架

## 后期会添加一写处理好的模板和组件化

### js 的使用方法

1、简单全局的使用：

app.js 中引用 methods.js  
methods: require('/utils/methods.js').default

在相应页面中  
页面头部：const app = getApp()  
使用的位置：app.methods.\$https(...)即可


2、页面的按需引用

在页面中  
const { $https } = require('/utils/methods.js').default  
使用的位置：app.methods.\$https(...)即可
