const mongoose = require("mongoose")
const AdminUserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    // 密码
    password: {
        type: String,
        select:false,
        set(val){
            console.log(val)
            return require("bcrypt").hashSync(val,10)
        }
    }
})

module.exports = mongoose.model("AdminUser", AdminUserSchema)