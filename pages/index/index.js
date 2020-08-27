const App = getApp();
import METHODS from "../../utils/methods.js";
import { $index } from "../../api/indexApi.js";
Page({

  data: {
    banner:[
      { id: 1, url: 'https://i.loli.net/2020/07/31/y4XGPrAfheSaHom.jpg' },
      { id: 2, url: 'https://i.loli.net/2020/07/31/y4XGPrAfheSaHom.jpg' },
      { id: 3, url: 'https://i.loli.net/2020/07/31/y4XGPrAfheSaHom.jpg' },
    ],
    menu: [
      {
        id: "1",
        image: "https://i.loli.net/2020/07/31/y4XGPrAfheSaHom.jpg",
        title: "水果",
        url: "",
      },{
        id: "2",
        image: "https://i.loli.net/2020/07/31/y4XGPrAfheSaHom.jpg",
        title: "坚果干果",
        url: "",
      },{
        id: "3",
        image: "https://i.loli.net/2020/07/31/y4XGPrAfheSaHom.jpg",
        title: "蔬菜",
        url: "",
      },{
        id: "4",
        image: "https://i.loli.net/2020/07/31/y4XGPrAfheSaHom.jpg",
        title: "农副产品",
        url: "",
      },{
        id: "5",
        image: "https://i.loli.net/2020/07/31/y4XGPrAfheSaHom.jpg",
        title: "肉禽蛋类",
        url: "",
      },{
        id: "5",
        image: "https://i.loli.net/2020/07/31/y4XGPrAfheSaHom.jpg",
        title: "海鲜水产",
        url: "",
      },{
        id: "5",
        image: "https://i.loli.net/2020/07/31/y4XGPrAfheSaHom.jpg",
        title: "速冻冷冻",
        url: "",
      },{
        id: "5",
        image: "https://i.loli.net/2020/07/31/y4XGPrAfheSaHom.jpg",
        title: "粮油食品",
        url: "",
      }
    ],
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      pageShow: true
    })
  },
  onShow: function (e) {
    let that = this;
    that.getInfo();
  },
  async getInfo(){
    let that = this;
    let data = {
      id: 1
    };
    //一
    let result1 = await $index.getData(data)
    //二
    let result2 = await $index.getData({
      id: 1
    })
    //三
    await $index.getData({
      id: 1
    }).then(result => {
      console.log(result)
    }).then(() => {
      console.log("then")
    })
    //四
    try{
      await $index.getData({
        id: 1
      }).then(result => {
        console.log(result)
      }).then(() => {
        console.log("then")
      })
    }catch{
      console.log('请求失败');
    }finally{
      console.log('请求完成');
    }
  },
  skipPage(e){
    let that = this;
    METHODS.$navigationTo(e);
  },
  onPullDownRefresh: function () {
    
  },
  onHide(){

  },
  onReachBottom: function () {
    
  },

  onShareAppMessage: function () {
    
  }
})