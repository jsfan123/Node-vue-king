module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    return async (req, res, next) => {
        // 如果返回的请求头中的签名为空
        assert(req.headers.authorization,401,"请先登录！")
        const token = req.headers.authorization.split(' ').pop()
        // 这里的 app 获取不到，但是可以用 req.app 完全代替 app
        const {id} = jwt.verify(token,req.app.get("secret"))
        assert(id,401,"请先登录！")
        req.user = await AdminUser.findById(id)
        assert(req.user,401,"请先登录！")
        await next()
    }
}