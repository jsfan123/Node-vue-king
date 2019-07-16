const mongoose = require("mongoose")
const ItemSchema = new mongoose.Schema({
    name:{type:String},
    // 这里的图标存的是图片的地址
    icon:{type:String}
})

module.exports = mongoose.model("Item",ItemSchema)
