const app = getApp();
const METHODS = require('../../../utils/methods.js');
const WxParse = require('../../../wxParse/wxParse.js');

Page({
  data: {
    info:{
      id:	166,
      title:	"5个自我管理的好习惯，职场小白看过来！",
      discribe:	"5个自我管理的好习惯，职场小白看过来！"	,
      create_time:"2020-05-09 15:13:17",
      detail:	"<p><span style=\"font-family:宋体, SimSun;font-size:16px\">在你生命的最初30年里，你养成了习惯；在你生命的最后的30年中，你的习惯决定了你。想要变得更好，以下这五个习惯必须要养成。</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">1.合理分配时间</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">俗话说，如何过一天，就如何过一生。</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">一个人的时间花在哪，成就就在哪，往往就会成为什么样的人。你若将时间用在自我提升上，投入到工作中，那么你就会比别人优秀；你若是在阅读上投入很多时间和精力，那么你就会比别人学识渊博...<br/></span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">当然，如果你将大量时间都花在了吃喝玩乐上，荒废人生，那么你最终就很可能会一事无成，越混越差。</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">所以，我们需要养成的第一个好习惯，就是管理好时间。</span></p><p style=\"text-align: center;\"><span style=\"font-family:宋体, SimSun;font-size:16px\"><img src=\"http://zhengqigou.oss-cn-shenzhen.aliyuncs.com/20200509151158c44204211.png\"/></span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">2不熬夜，早睡早起</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">我们需要养成的第二个习惯，就是不熬夜，早睡早起。</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">一来是为了健康，二来是为了成长。很多人其实是有志向和计划安排的，但最终未能成行，迟迟不去行动，往往和糟糕的作息有不小的关系。</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">俗话说，一年之计在于春，一天之际在于晨。如此良性循环下去，长此以往，人生定将是另一番模样。</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">3.学会列办事清单</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">每天列出待办事项清单，最好是按照轻重缓急来排出优先级。</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">一是，可以让我们做事更有条理，也会更加高效、靠谱；二是，可以改善做事拖延的情况；三是，可以训练我们的统筹管理能力。<br/></span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">4.长期坚持阅读</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">坚持阅读，汲取有价值的信息和知识，可以让我们在事业上更容易取得成功。正如董卿所言，它总会在未来日子的某一个场合帮助我表现得更出色。</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">除此之外，阅读可以让我们的精神世界免于荒芜，可以让我们以一种更好的心境和精神面貌去应对这个世界。</span></p><p style=\"text-align: center;\"><span style=\"font-family:宋体, SimSun;font-size:16px\"><img src=\"http://zhengqigou.oss-cn-shenzhen.aliyuncs.com/202005091512466063a2620.png\"/></span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">5.时常反思</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">我们需要养成的第五个习惯，就是时常反思自己。</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">人非圣贤，孰能无过。每个人都会犯错，都不是完人，所以我们不要害怕面对不完美的自己。犯错不是最可怕的，真正可怕的是知错不改，在错误的道路上越走越远，这才是致命的。</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">有个小建议：每天晚上临睡前可花上几分钟时间对当日进行复盘，看看为人处事时有哪些地方处理的不好，思考更优的处理方法。</span></p><p><span style=\"font-family:宋体, SimSun;font-size:16px\">不要小看这样的小习惯，长期坚持下去，定会让你受益良多。</span></p>",
      views: "39",
      image:{
        flag:	"1",
        file_path	:	"https://zhengqigou.oss-cn-shenzhen.aliyuncs.com/20200509151158c44204211.png",
      },
      category: {
        id:	"2",
        title:"职场社交",
        active:	null
      },
    },
  },
  onLoad: function (options) {
    let that = this;  
    that.setData({
      pageShow: true,
      editor: WxParse.wxParse('editor', 'html', that.data.info.detail, that, 5),
    })
  },
  onShareAppMessage: function () {

  }
})