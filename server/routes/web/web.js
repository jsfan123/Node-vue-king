module.exports = app => {
    const express = require('express')
    const mongoose = require('mongoose')
    // 通过 mongoose.model 方法来引入数据模型，
    // 因为 我们所使用的模型已经在 数据库中定义了
    const router = express.Router()
    const Category = mongoose.model('Category')
    const Article = mongoose.model("Article")
    const Hero = mongoose.model("Hero")
    // 初始化新闻列表数据
    router.get("/art/init", async (req, res) => {
        const parent = await Category.find({
            name: '新闻资讯'
        })
        const cats = await Category.find({
            parent: parent
        }).lean()
        const arts = await Article.find()
        const newsTitle = ["新版本爆料③ 稷下美术设定全方位揭秘！", "新版本爆料② | 鲁班钟馗喜提新皮，荣耀战令奖励更新！", "新版本爆料①丨S16赛季王者峡谷最新调整，盾山赛季皮肤现身！", "匹配机制优化 | 想玩英雄不重位，阵容搭配新体验！", "夏日新版本“稷下星之队”即将6月上线", "6月20日全服不停机更新公告", "6月19日全服不停机更新公告", "6月18日全服不停机修复公告", "6月18日全服不停机更新公告", "6月14日安卓建议更新公告", "恭喜eStarPro捧起银龙杯 赛末冲刺惊喜礼不断", "【稷下的邀约】活动公告", "活力夏日活动周 王者峡谷好礼多", "王者大陆的端午宝藏活动公告", "峡谷庆端午 惊喜礼不断", "【6月15日 再战西安 · 2019年KPL春季赛总决赛重启公告】", "王者荣耀世界冠军杯荣耀来袭，KPL赛区选拔赛谁能突围而出？", "【关于2019年KPL春季赛总决赛门票退换及异地用户现场观赛补贴公告】", "后半段赛程持续发力，城市赛第十二周将有哪些精彩赛事？", "SRET表演赛快讯：KZ2：0EMC锋芒不减，刻苦训练备战世冠选拔赛"]
        const newsList = newsTitle.map(title => {
            return {
                // 每次随机新闻资讯的子分类中选取两个分类作为该文章的类型
                categories: cats.slice(0).sort((a, b) => Math.random() - 0.5).slice(2),
                title: title
            }
        })
        // await Article.deleteMany()
        // await Article.create(newsList)
        res.send(arts)
    })
    // 新闻列表接口
    router.get('/news/list', async (req, res) => {
        // const parent = await Category.findOne({
        //     name: '新闻资讯'
        // }).populate({
        //     path:'children',
        //     populate:{
        //         path:'newsList'
        //     }
        // }).lean()

        // 使用聚合查询
        const parent = await Category.findOne({
            name:'新闻资讯'
        })
        const cats = await Category.aggregate([
            {$match:{parent:parent._id}},
            {
                $lookup:{
                    // 想关联查询的集合名字，小写复数
                    from:'articles',
                    localField:"_id",
                    // 关联外键名字为
                    foreignField:'categories',
                    // 自己定义的 属性名
                    as:'newsList'
                }
            },
            // 设置每个子分类查出五个文章
            {
                $addFields:{
                    newsList:{$slice:['$newsList',5]}
                }
            }
        ])   
        const subCats = cats.map(v=>v._id)
        cats.unshift({
            name:'热门',
            newsList:await Article.find().where({
                // $in 表示只要是文章分类中的任意一个分类都可以
                categories:{$in:subCats}
            }).populate('categories').limit(5).lean()
        }) 

        // 再为每个分类的文章添加一个唯一的分类名如：新闻，公告，活动...
        cats.map(cats=>{
            cats.newsList.map(news =>{
                // 当主分类名时 热门时，要让文章的分类名，
                // 显示为与原来文章的分类名，所以进行判断
                news.categoryName = cats.name === '热门'?news.categories[0].name:cats.name
                news.date = news.updated
                return news
            })
            return cats
        })
        res.send(cats)
    })

    // 新闻资讯文章详情接口
    router.get("/article/:id",async(req,res)=>{
        console.log(req.params.id)
        const id = req.params.id;

        const art = await Article.findById(id).lean()
        console.log(art)
        res.send(art)
    })

    // 程序化 批量插入 英雄数据
    router.get('/heros/init',async(req,res)=>{
        const delte = await Hero.deleteMany()
        const heroList = [{"name":"热门","heros":[{"name":"后羿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"鲁班七号","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"甄姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"孙尚香","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"典韦","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},{"name":"韩信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},{"name":"庄周","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"}]},{"name":"战士","heros":[{"name":"赵云","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},{"name":"钟无艳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},{"name":"吕布","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},{"name":"曹操","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"},{"name":"典韦","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},{"name":"宫本武藏","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"},{"name":"达摩","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},{"name":"老夫子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"},{"name":"关羽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"},{"name":"露娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},{"name":"花木兰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"刘备","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"},{"name":"杨戬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"},{"name":"雅典娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"},{"name":"哪吒","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"狂铁","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"},{"name":"李信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"},{"name":"盘古","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"}]},{"name":"法师","heros":[{"name":"小乔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"},{"name":"墨子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},{"name":"妲己","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"嬴政","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"},{"name":"高渐离","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"},{"name":"扁鹊","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"},{"name":"芈月","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},{"name":"周瑜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"},{"name":"甄姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"武则天","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"},{"name":"貂蝉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"},{"name":"安琪拉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},{"name":"姜子牙","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"},{"name":"王昭君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"},{"name":"张良","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"},{"name":"不知火舞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},{"name":"钟馗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},{"name":"诸葛亮","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"},{"name":"干将莫邪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"},{"name":"女娲","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"},{"name":"杨玉环","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"},{"name":"弈星","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"},{"name":"米莱狄","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"},{"name":"沈梦溪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"},{"name":"上官婉儿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"嫦娥","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"}]},{"name":"坦克","heros":[{"name":"廉颇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"},{"name":"刘禅","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"},{"name":"白起","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"},{"name":"夏侯惇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},{"name":"项羽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"},{"name":"程咬金","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"},{"name":"刘邦","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"},{"name":"牛魔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"},{"name":"张飞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"},{"name":"东皇太一","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"},{"name":"苏烈","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},{"name":"梦奇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"},{"name":"孙策","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},{"name":"猪八戒","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"}]},{"name":"刺客","heros":[{"name":"阿轲","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"},{"name":"李白","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"},{"name":"韩信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},{"name":"兰陵王","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"},{"name":"娜可露露","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"},{"name":"橘右京","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},{"name":"百里玄策","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"},{"name":"裴擒虎","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"},{"name":"元歌","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"},{"name":"司马懿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},{"name":"云中君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"}]},{"name":"射手","heros":[{"name":"孙尚香","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"鲁班七号","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"马可波罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"},{"name":"狄仁杰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"},{"name":"后羿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"李元芳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"},{"name":"虞姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"},{"name":"成吉思汗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"},{"name":"黄忠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"},{"name":"百里守约","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},{"name":"公孙离","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"},{"name":"伽罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"}]},{"name":"辅助","heros":[{"name":"庄周","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},{"name":"孙膑","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"},{"name":"蔡文姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"},{"name":"太乙真人","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"},{"name":"大乔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"},{"name":"鬼谷子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"},{"name":"明世隐","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"},{"name":"盾山","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"},{"name":"瑶","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"}]}]
        for(let cats of heroList){
            // 跳过热门分类
            if(cats.name === "热门"){
                continue
            }
            // 按照分类名 分类中查找对应的分类 id,然后设置为 heros 的关联属性 cactegories

            const heroCategories = await Category.findOne({
                name:cats.name
            })
            // 然后将heros 中的每个英雄都加上 这个关联属性
            cats.heros = cats.heros.map(h=>{
                h.categories=[heroCategories._id]
                return h
            })
            // 将每个分类下的 heros 导入进数据库中
            await Hero.insertMany(cats.heros)
        }
        res.send(await Hero.find());
    })

    // 英雄列表接口
    router.get('/heros/list',async(req,res)=>{
        const parent = await Category.findOne({
            name:'英雄分类'
        })
        // 聚合管道查询
        // aggregate([])
        // 为每个 英雄分类，生成对应的英雄列表
        const heros = await Category.aggregate([
            {$match:{parent:parent._id}},
            {$lookup:{
                from:"heroes",
                foreignField:'categories',
                localField:'_id',
                as:"heroList"
            }}
        ])
        // 随机生成 热门分类的英雄列表
        const subCats = heros.map(v=>{
            return v._id
        })
        heros.unshift({
            name:"热门",
            heroList:await Hero.find().where({
                categories:{$in:subCats}
            }).limit(10)
        })

        res.send(heros)
    })

    
    app.use('/web/api', router)

}