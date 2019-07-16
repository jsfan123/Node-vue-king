const mongoose = require("mongoose")
const HeroSchema = new mongoose.Schema({
    name:{type:String},
    // 称号
    title:{type:String},
    // 这里的图标存的是图片的地址
    avatar:{type:String},
    categories:[{type : mongoose.SchemaTypes.ObjectId, ref:'Category'}],
    // 评分
    scores:{
        // 难度
        diffcult:{ type:Number },
        // 技能
        skill:{ type:Number },
        // 攻击
        attack:{ type:Number },
        // 生存
        survive:{ type:Number }
    },
    // 一个英雄有多个技能，且一个技能里面还包括：图标、描述、小提示
    // 所以用数组包裹对象，表示有多个技能
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String}
    }],
    // 出装推荐，一套装备，包含多个物品，
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    // 英雄关系
    partners:[{
        hero:{type:mongoose.ObjectId,ref:'Hero'},
        tips:{type:String}
    }]
})

module.exports = mongoose.model("Hero",HeroSchema,"heroes")
// 第三个参数代表指定的集合名称，因为mongoose 自动将 Hero 转化为 heros 是不对的，应该是 heroes
