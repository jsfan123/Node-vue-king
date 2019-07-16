const mongoose = require("mongoose")
const ArticleSchema = new mongoose.Schema({
    // 文章标题
    title:{type:String},
    // 文章分类
    categories:[{type : mongoose.SchemaTypes.ObjectId, ref:'Category'}],
    // 详情
    body:{type:String}
},
{
    timestamps:{
        createdAt:'created',
        updatedAt:'updated'
    }
})

module.exports = mongoose.model("Article",ArticleSchema)
