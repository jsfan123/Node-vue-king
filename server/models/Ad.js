const mongoose = require("mongoose")
const AdSchema = new mongoose.Schema({
    name:{type:String},
    items:[{
        // 跳转链接
        url:{type:String},
        image:{type:String}
    }]
})

module.exports = mongoose.model("Ad",AdSchema)
