const express = require("express")
const app = express()
const path = require('path')

app.set('secret','fsjdfjdsj')

// 引入express json 中间件
app.use(express.json())
// 解决跨域
app.use(require('cors')())

// 将 文件夹 upload 开发为共享静态文件
app.use('/upload/', express.static(path.join(__dirname , "/upload")))


// 同上 这里是连接 mongodb 数据库
require('./plugins/db')(app)
// 将 app 作为参数传入 /routes/admin/index.js里的函数中作为形参
require("./routes/admin/index.js")(app)
require("./routes/web/web.js")(app)




app.listen(3000, () => {
    console.log("http://localhost:3000")
})