const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String
    },
    // 这里设置parent 关联的 模型，type 一定要设为 mongoose.SchemaTypes.ObjectId
    // 并且设置关联模型 使用 ref : "模型名称"
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }
})

// 设置分类的子分类
schema.virtual("children", {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

// 设置文章分类的newsList虚拟属性
schema.virtual("newsList",{
    localField:'_id',
    // 关联的外键 文章模型中的分类属性
    foreignField:'categories',
    justOne:false,
    ref:'Article'
})

module.exports = mongoose.model("Category", schema)