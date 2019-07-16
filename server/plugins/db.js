// 链接mongodb数据库文件
module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect("mongodb://localhost:27017/node-vue-king", {
        useNewUrlParser: true
    })


    // 使用插件 把 models 中所有的 数据模型引用一遍
    require('require-all')(__dirname + '/../models')
}