module.exports = app => {
    const express = require("express")
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require("../../models/AdminUser")

    const router = express.Router({
        // 导入父级参数到子级配置
        mergeParams: true
    })
    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    const modelmiddlerware = require("../../middleware/model")

    // 新建接口
    router.post("/create", authMiddleware(), async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 分类列表的接口
    router.get("/list", authMiddleware(), async (req, res) => {
        let queryOptions = {}
        // req.Model.modelName 表示模型的名字 大写的
        // 表示如果 是 分类管理的话就去查找 parent
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        // else if(req.Model.modelName === "Hero" ){
        //     queryOptions.populate = 'categories'
        // }

        const model = await req.Model.find().setOptions(queryOptions).limit(200)
        res.send(model)
    })
    // 编辑 分类 接口
    router.get("/edit/:id", authMiddleware(), async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 编辑分类 保存 接口
    router.put("/edit/:id", authMiddleware(), async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 删除分类的接口
    router.delete("/delete/:id", authMiddleware(), async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            message: "success"
        })
    })

    // 然后将 router 对象挂载到 app 中
    // 给请求地址添加一个动态参数 :resource 表示请求的资源类型
    app.use("/admin/api/rest/:resource", authMiddleware(), modelmiddlerware(), router)

    // 这里上传的是一张图片，express 默认是没有接收这个文件的能力的
    // 所以需要引入一个中间件 multer 可以在 入口文件index.js 中引入
    const multer = require("multer")
    const path = require('path')
    let upload = multer({
        dest: path.join(__dirname + "/../../upload")
    })
    // dest: __dirname + '/../../upload'
    // 表示在当前文件的绝对路径下的前两级目录
    app.post("/admin/api/upload", authMiddleware(), upload.single("file"), async (req, res) => {
        const file = req.file
        // 这里返回需要返回图片的请求路径，所以需要开放静态资源文件
        file.fileUrl = `http://localhost:3000/upload/${file.filename}`
        res.send(file)
    })

    // 登陆的接口
    app.post("/admin/api/login", async (req, res) => {
        // 通过解构赋值获取用户名和密码
        let {
            username,
            password
        } = req.body
        // 1.判断用户名是否存在，不存在，返回422状态码
        const model = await AdminUser.findOne({
            username: username
        }).select('+password')
        // const model = await AdminUser.find()
        assert(model, 422, '用户名不存在！')

        // 2.检验密码是否正确，需要使用 bcrypt 进行校验
        // 这里由于我们在 数据模型中，设置了查询不显示，所以在这里
        // 需要在设置一个参数才能查询到密码
        let isValid = require('bcrypt').compareSync(password, model.password)
        assert(isValid, 422, '密码错误！')
        //表示如果 isValid 为false 返回 422 状态码，并返回 message:'密码错误'

        // 3.返回token（需要使用插件jsonwebtoken)等其他信息
        // app.set('sercet','fsjdfjdsj')
        // 第二个参数很重要，通过生成一个字符串去生成 token
        const token = jwt.sign({
            id: model._id
        }, app.get('secret'))
        // 然后响应 token 回去
        res.send({
            token
        })
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode).send({
            message: err.message
        })
        next()
    })
}