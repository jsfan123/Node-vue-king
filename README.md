# Node-vue-king
王者荣耀项目
## 第一步 创建文件目录
### 先在github上新建一个仓库

+注意第一个字母大写

这里我创建的仓库名字为 `Node-vue-king` 

接下来选中这两个选项，并勾选 主动创建一个仓库说明文件 README.md



![1559904302986](https://github.com/jsfan123/Node-vue-king/blob/master/readmeImg/1559904302986.png)

这两个选项的意思是

生成一个.gitgnore 文件 基于node 

另一个是生成一个 MIT 协议文件，告诉别人这个项目是开源的

### 在本地创建自己的仓库

1. 首先先去复制 在github上生成的 仓库地址

![1559904809916](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1559904809916.png)

点击链接地址的右侧图标可以复制

2.  在本地打开你的想存放这个仓库的文件夹目录，然后点击右键选中 git bush --(这里默认你已经在电脑上安装了git)

3.  然后输入命令

   ```powershell
   git clone https://github.com/fan-Github-l/Node-vue-king.git
   # clone 之后的就是你刚才复制的那串地址
   ```

4.  然后在你的电脑上就可以看到生成了一个名为  `Node-vue-king` 的项目文件了

5. 里面包含了 这几个文件

![1559905302258](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1559905302258.png)

#### 到这里你的本地仓库就创建完毕了

## 第二步

经过分析这个项目一共主要包括**三个文件**

1. server	  ---- 对应的是 `服务器`
2. admin      ---- 对应的是 `后台管理界面`
3. web         -----  对应的是 `前端界面`

然后分别创建这三个文件

### 首先 创建 server 

* 然后再 server文件夹中创建 package.json 文件 用来管理我们的项目文件

可以通过命令来快速初始化

```powershell
npm init -y
```

然后再安装我们会使用到的第三方包 

```powershell
npm install express@5 mongoose cors
```

- 通过上面的命令 我们一共安装了三个包，express 框架，操作mongodb的第三方插件mongoose

以及解决跨域问题的 cors 插件

- 然后我们新建一个server的入口文件index.js

 (因为package.json 默认的入口文件就是index.js所以我们保持和它一致)

### 如何把 常用的 CRUD 接口做成通用的

-   给请求地址添加一个动态参数 :resource 表示请求的资源类型

      - app.use("/admin/api/rest/:resource",router)

- 然后考虑如何根据**请求**的**资源类型**来判断是哪个**数据库模型**（即数据表）

  + 我们可以这样设置，将数据表的名称 设置为大写的资源名称单数，比如：

    - **请求的资源名称**为 categories  则**对应的数据表名**为就为 Category

      + **注意**：

        ```javascript
        // 直接这样是拿不到请求参数的
        const Model = req.params.resource
        // 解决办法如下
        const router = express.Router({
            mergeParams:true
        })
        ```

        

    - 根据这样的思想，我们就可以去设计我们的数据表名即请求的资源名

  + 然后再考虑如何 把 **categories 转化为 Category**

    - 我们可以使用插件 **inflection** 插件来进行转化，这个插件主要用来助理字符串，可以实现英文单词的单复数，大小写等进行转换

  + 具体操作如下

    1. 安装

    ```powershell
    npm install inflection
    ```

    2. 使用 参考[npm inflection](<https://www.npmjs.com/package/inflection>) 文档

    ```javascript
    // 导入模块
    var inflection = require( 'inflection' );
    // 使用 inflection.classify(str) 方法
    inflection.classify( 'message_bus_properties' ); // === 'MessageBusProperty'
    ```

    

### 然后再创建 admin 

这里我们就不需要手动构建 admin 目录了，我们使用 vue-cli@3 帮我们构建

1. 使用 vue -V 或 vue --version 命令 查看 当前vuecli 版本

   ```powershell
   vue -V
   # 或
   vue --version
   ```

2. 如果不是 vuecli@3 使用 npm 进行升级

   ```powershell
   npm init @vue/cli -g
   ```

3. 安装完之后通过 命令快速构建项目

   ```powershell
   vue create admin
   ```

   出现的选项，根据自己的需求勾选，这里我们选择默认选项 default (babel,eslint)

4. 之后 根据命令提示 

   + cd admin
   + npm run serve

   表示进入到 admin 文件目录，然后再使用 npm run serve 运行项目

5. 在能显示 vue 的默认页面之后，我们需要使用 Element.ul 来构建我们的项目

6. 通过 命令

   ```powershell
   vue add element
   ```

   + 可以快速引入Element.ul 
   + 不用再像 vuecli@2 那么麻烦了

7. 然后再 npm run serve 运行项目，在页面的图片下方出现一个 el-button 的按钮之后则表示引入成功

   

   ### 再创建web

   - 和创建 admin 基本一样，所以不再啰嗦
   - npm run serve 运行查看结果，同上。。。。。。。



# 注意事项

## 1 使用 URL 如何传参以及接收传来的参数

**在本案例中 在分类列表页 点击编辑按钮，跳转到具体的分类页面需要经过两步**：

- 通过 当前分类的 id 去数据库中查找相应的数据，并返回查询到的值给客户端

  而其中，又涉及到两个问题，

  1. 怎么拿到 当前分类的id
  2. 如何传当前 id 的值去数据库中查找 并返回数据，然后客户端把接受到的数据渲染到编辑分类这个页面中

  **先解决问题1：**

  因为`编辑` 操作这个按钮是通过 Element.ui 的表格中操作来进行布局的：如下

  ```javascript
  <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
              <el-button @click="$router.push(`/categories/edit/${scope.row._id}`)" 					type="success" size="small">编辑</el-button>
          </template>
  </el-table-column>
  
  // 其中 scope 代表的是这个页面中的所有数据，
  // scope.row._id 代表的就是当前数据行 的 id
  
  ```

  ***到此我们就解决了第一个问题。***

  **然后我们再解决问题二：**

  1. 如何传当前分类的 id 去数据库查找数据
     - 首先 我们要在 admin 路由文件 router.js 中 改变增加路由

  ![1559927024776](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1559927024776.png)

  ​	从上图我们可以看出 `分类编辑` 组件和 `新建分类` 组件是引用的是同一个组件
  
  ​	然后把 路由地址path 改为了 "/categories/edit/:id"，并添加一个属性 props:true
  
  + 	其中  /:id  表示可以接受任意参数
  + 	props : true 表示将得到的 参数 id 传给页面 CategoryEdit.vue
  
  ​	然后需要在 CategoryEdit.vue 中 接收 然后在 CategoryEdit.vue 中就可以使用这个 id 了
  
  ```javascript
  <script>
  export default {
      props: {
          id: {}
      },
      data() {
          return {
              model: {},
              parents:{}
          }
      }
  }
  </script>
  ```
  
  
  
  然后根据请求的参数中是否含有 id ，来对页面做不同的显示
  
  ```javascript
  <template>
  <div>
      <h2>{{id?'编辑':'新建'}}分类</h2>
      <el-form @submit.native.prevent="save" label-width="auto" label-position="left">
          <!-- 显示父分类 -->
          <el-form-item label="上级分类">
              <el-select v-model="model.parent" placeholder="请选择">
                  <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="名称">
              <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" native-type="submit">{{id?'保存':'创建'}}</el-button>
          </el-form-item>
      </el-form>
  </div>
  </template>
  
  <script>
  export default {
      props: {
          id: {}
      },
      data() {
          return {
              model: {},
              parents:{}
          }
      },
      methods: {
          async save() {
              // 使用 ES7 语法 async awit
              // 通过 this.id 也可以接受 CategoryList 界面 点击编辑按钮传过来的参数
              if (this.id) {
                  // 编辑 分类保存
                  let res = await this.$http.put(`/categories/edit/${this.id}`, this.model);
              } else {
                  // 新建 分类保存
                  let res = await this.$http.post("/categories/create", this.model);
              }
              // 然后跳转到列表页
              this.$router.push('/categories/list')
              this.$message({
                  message: "分类创建成功",
                  type: "success"
              });
          },
          async fetch() {
              const res = await this.$http.get(`/categories/edit/${this.id}`)
              this.model = res.data
          },
          async fetchParents(){
              const res = await this.$http.get("/categories/list")
              this.parents = res.data
              console.log(this.parents)
          }
      },
      created(){
          this.id && this.fetch()
          this.fetchParents()
      }
  }
  </script>
  
  <style>
  
  </style>
  
  ```
  
  
  
  

## 2 如何在 mongoose 数据库中实现一个集合和另外一个集合建立关联

1. 设置关联字段的 type 为 mongoose里面的id类型

   ```javascript
   parent:{type:mongoose.SchemaTypes.ObjectId}
   ```

2. 设置 parent 字段关联的模型是谁,使用 ref 属性 指定 该字段关联的 模型

   ```javascript
   parent:{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}
   ```

3. 这里是通过 id 字段 来建立关联

   **那我们怎么通过关联字段来查询对应的数据呢？**

   - 可以通过pupolate("需要关联查询的字段") 方法来进行关联数据查询

   ```java
   router.get("/categories/list",async(req,res)=>{
   	const model = await Cactegory.find().populate(parent).limit(10)
       res.send(model)
   })
   ```
   
   ** 我们也可以根据请求的资源名 来 判断是否需要执行populate
   
   ```javascript
    router.get("/list",async(req,res)=>{
           let queryOptions = {}
           // req.Model.modelName 表示模型的名字 大写的
           // 表示如果 是 分类管理的话就去查找 parent
           if(req.Model.modelName === 'Category'){
               queryOptions.populate = 'parent'
           }
           const model = await req.Model.find().setOptions(queryOptions).limit(10)
           res.send(model)
       })
   ```
   
   

## 3 使用Element中select 选择器的经验

### 1. 什么时候使用 **select 选择器** 

- 比如：选择一个英雄属于的类型，这时我们就可以使用 select 选择器
- 而且选择器中的英雄分类应该从英雄分类中去拿到分类的名字
- 所以在设计英雄的数据模型时，我们应该设计一个关联属性：categories
- 为什么是 categories？ 因为一个英雄对应多个分类
- 此时应该注意：如果，这里的关联字段是负数：则选择器一定要加上 multiple（多选）

```javascript
<el-select>
        <el-options v-for="item in parents" :key="item._id" :label="item.name" 	                 :value="item._id">
        </el-options>
  </el-select>
```

- el-options 中的参数详解
  * :label 表示选择器选项所显示的内容
  * :value 表示选择中选项时所提交的值是什么

## 4 在vue 中如何上传图片

1. **使用 Element.Ui upload 上传 组件**

```javascript
<el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```

**注意**：

- :on-success	表示选择上传图片成功后要干啥？
- :before-upload  表示上传前要干啥
- action 表示上传的地址，就是发送请求给服务端，让**服务端把图片保存起来**，然后服务端再返回一个图片的地址给前端

2. **怎么在服务端把前端发送的图片文件保存起来**
   -  这里客户端发送的是一张图片，express 默认是没有接收这个文件的能力的
   - 所以需要引入一个中间件 multer 
   - Multer 是一个 node.js 中间件，用于处理 `multipart/form-data` 类型的表单数据，它主要用于**上传文件**。它是写在 [busboy](https://github.com/mscdex/busboy)之上非常高效。

**注意**: Multer 不会处理任何非 `multipart/form-data` 类型的表单数据。

   + 如何使用 multer

   + 我们首先去到 服务端的 入口文件中开放静态资源文件 /upload

     操作如下
     
     ```javascrip
     // path 是node 的核心模块，不需要安装
     const  path = require('path')
     app.use('/upload',express.static(path.join(__dirname+'/upload')))
     ```
     

然后在路由模块中引用
     
     ```javascript
     const multer = require("multer")
         let upload = multer({
             dest: __dirname + '/../../upload'
         })
         // dest: __dirname + '/../../upload'
         // 表示在当前文件的绝对路径下的前两级目录
          app.post("/admin/api/upload", upload.single("file"),async (req, res) => {
             const file = req.file
             // 这里返回需要返回图片的请求路径，所以需要开放静态资源文件
             file.fileUrl = `localhost:3000/upload/${flie.filename}`
        		// 将fileUrl 设为 file对象的属性，然后把 file 发送给客户端     
             res.send(file)
         })
     ```
     
     **接下来再客户端中进行处理**
     
     - 客户端接受到 服务端发送的响应之后，将地址绑定到 img的 src 属性上，然后然上传图片的框中，显示需要上传的图片。如：
     
       ```javascript
       methods:{
       	// 接受到服务端发送的响应之后，执行这个方法
           afterUpload(res){
                   // this.model.icon = res.fileUrl
                   // 这里使用这种方法，导致数据this.model.icon没有绑定上,因为之前model是一个空对				象，没有icon 这个属性
                   // 为了解决这种情况我们使用 Vue 提供的方法
                   this.$set(this.model,"icon",res.fileUrl)
        			// 第一个参数表示需要设置属性的对象，
               	// 第二个参数表示需要设置的属性，
               	// 第三个参数表示需要设置的属性值
               }
       }
       
       ```
     
       ```javascript
       <el-form-item label="图标">
                  <el-upload
                   class="avatar-uploader"
                   action="http://localhost:3000/admin/api/upload"
                   :show-file-list="false"
                   :on-success="afterUpload">
                   <img v-if="model.icon" :src="model.icon" class="avatar">
                   <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                   </el-upload>
               </el-form-item>
       ```
     
       ## 5 解决给空对象添加属性值无效的问题
     
       向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 `this.myObject.newProperty = 'hi'`)
     
       #### Vue.set( target, propertyName/index, value )](https://cn.vuejs.org/v2/api/#Vue-set)
     
       - **参数**：
         - `{Object | Array} target`
         - `{string | number} propertyName/index`
         - `{any} value`
     
       **实例**：
     
       ```javascript
        this.$set(this.model,"icon",res.fileUrl)
        			// 第一个参数表示需要设置属性的对象，
               	// 第二个参数表示需要设置的属性，
               	// 第三个参数表示需要设置的属性值
       ```

​       

## 5 解决存在于项目中的bug

问题描述：

+ 因为编辑页面和新建页面是同一个界面，所以我们在别的页面点击链接跳转到这个页面时，我们是根据该链接中是否含有 Id 参数，来判断显示编辑页面，还是显示新建页面。

+ 但是这样会存在一个问题，就是如果我是先点击了，列表界面中的编辑按钮，然后跳转到编辑页面，此时，在点击左侧导航栏的新建分类（物品/英雄）时，新建分类（物品/英雄）页面依然显示的是编辑页面的内容，而且，点击创建按钮，服务端报 500 错误，报错原因是因为 id 已存在，不能重复创建！

+ 那怎么解决呢？
  - 一开始，想着是，怎么进一步区分编辑页面和新建页面，即当进入新建页面时，把 所有的 id 参数都清空，但是想法有，就是不会！
  - 但是，凭借着一股杠劲，我编辑页面，再点击新建页面时，然后按了一下 F5 刷新了页面，发现就能正常显示新建界面了。
  - 接下来，就是怎么在点击左侧导航栏新建分类时，先刷新下页面。
  - 介绍两种刷新界面的办法：
  
  ### 使用大佬的方法解决，只需一行代码：
  
  ```javascript
   <!-- 这里根据 路由来判断组件，即可解决编辑页跳转新建页的bug -->
              <router-view :key="$route.path"></router-view>
  ```
  
  

方法一：

```javascript
this.$router.go(0)
// 或
this.$router.replace({
	path:'/index'
})
```

但是这种方法都有不足，会导致页面空白一下，然后才刷新

所以我们使用方法二：

```javascript
// 把原先的跳转链接，改为点击后触发方法 skip(val)
<el-menu-item-group>
    <template slot="title">分类</template>
    <el-menu-item @click="skip('categories')">新建分类</el-menu-item>
    <el-menu-item index="/categories/list">分类列表</el-menu-item>
</el-menu-item-group>

// 然后使 router-view 默认显示
<router-view v-if="isRouterAlive"></router-view>

export default {
    data() {
        return {
            isTrue: true
        }
    },
    provide() {
        return {
            reload: this.skip
        }
    },
    methods: {
        skip(val) {
            this.isTrue = false
            this.$router.push(`/${val}/create`)
            this.$nextTick(function () {
                this.isTrue = true
            })
        }
    }
};
```

搞定，大功告成！

## 6 如何设置 mongoose 中的数据关联

1. **实现一对一**

   - 比如：一个英雄，对应一个分类

   - 在**设计数据模型**时，我们就可以把分类，设置为一个**英雄**的字段，然后设置类型为 Id，并关联**英雄分类模型**

     代码如下：

     ```javascript
     const HeroSchema = new mongoose.Sechema({
         name:{type:String},
         avatar:{type:String},
         category:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}
     	// 这里是一个英雄对应一个字段，所以字段名用单数 category，然后，用对象表示有一个分类
         // 数据类型type 一定是mongoose.SchemaTypes.ObjectId
         // 然后设置这个属性，关联的是哪个表（模型） 使用 ref：“表名（模型名）属性
     })
     ```

2. **实现一对多**

   + 也可以是，一个**英雄**，对应多个**英雄分类**，比如：皇子既可以打上单，也可以打野，还可以和 潘生 组成快乐的下路双人组。。。

   + 在设计数据模型时，我们同样把**英雄分类**设置为**英雄模型**的一个字段，然后设置类型为 Id，并关联**英雄分类模型**

     具体设计如下：

     ``` javascript
     const HeroSchema = new mongoose.Sechema({
         name:{type:String},
         avatar:{type:String},
         categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}]
     	// 这里是一个英雄对应多个分类，所以字段名用单数 category，然后，用数组表示有多个分类
         // 数据类型type 一定是mongoose.SchemaTypes.ObjectId
         // 然后设置这个属性，关联的是哪个表（模型） 使用 ref：“表名（模型名）属性
     })
     ```

## 7 mongoose 数据模型设计思想

   ### 1. 如果 一个英雄有多个技能，且每个技能里还包括：图标、描述、小提示等内容。

   - 我们可以采用数组包裹对象方式来声明字段，表示有多个技能


    skills:[{
           icon:{type:String},
           name:{type:String},
           description:{type:String},
           tips:{type:String}
       }],
      ```

   









## 8 前端接受数据库模型存在的问题

1. 如果，在数据库中定义的是 对象字段，在没有存数据是，后台把数据模型响应给前端时，是没有该对象字段的。所以使用 this.model = res.data 

2. res.data 会把 model 中原来存在的字段覆盖

3. 所以，为了解决这个问题，我们应该先在前端把该数据属性写为一个空对象

   ```javascript
    model: {
    	scores:{}
    }
   ```

   但是如果我们还想获取scores其中的属性时，也会报错，即 model.scores.diffcult

   - 使用下面这种方法可以解决

     ```javascript
     this.model = Object.assign({},this.model,res.data)
     ```

     

## 9 如何在 vue 中使用富文本编辑器（保存文章数据时用到）

### 1. 安装  vue2-editor

```powershell
npm install vue2-editor --save
```

### 2. 在需要使用的页面导入

```javascript
<script>
    // 这里需要使用解构赋值 {a,b} = {a:1,b:2}
    import { VueEditor } from "vue2-editor";
	// 在 components中 添加该组件名
	export default {
        components:{
            VueEditor
        }
    }
</script>
```

### 3. 在页面中 直接使用

```javascript
<div>
    <vue-editor v-model=""></vue-editor>
</div>
```

###  4 如何解决在富文本编辑器中上传图片导致资源过大的问题

1. 参考[vue2-editor](<https://www.npmjs.com/package/vue2-editor#example---custom-image-handler>)文档中示例 - [自定义图像处理程序/Custom Image Handler](https://www.npmjs.com/package/vue2-editor#example---custom-image-handler)

2. 示例 ，我们可以使用 ES7的 async和await 来简化官网上的例子

   ```javascript
   <template>
     <div id="app">
       <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="htmlForEditor"> </vue-editor>
     </div>
   </template>
    
   <script>
     import { VueEditor } from "vue2-editor";
     import axios from "axios";
     export default {
       components: {
         VueEditor
       },
    
       data() {
         return {
           htmlForEditor: ""
         };
       },
    
       
       methods: {
           handleImageAdded(file,Editor,cursorLacation,reseUploader){
               var formData = new FormData();
               formData.append("file",file);
              	// 这里 formData.append("file",file)里的第一个参数之所以改为 "file"
               // 是因为我们发送给后台的formData 类型就是 file
               
            	// 这里使用我们自己定义的 $http 发送请求   
               const res = await this.$http.post("/upload",formData)
            	// 接收服务器响应的数据后（即图片的请求地址：fileUrl）
               let url = res.data.fileUrl; // Get fileUrl from response
               Editor.insertEmbed(cursorLocation, "image", url);
            	// 这里的 "image" 不能该，因为这里表示上传的是 图片   
               resetUploader();
           }
           
         /*  
         handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
           // An example of using FormData
           // NOTE: Your key could be different such as:
           // formData.append('file', file)
    
           var formData = new FormData();
           formData.append("image", file);
    
           axios({
             url: "https://fakeapi.yoursite.com/images",
             method: "POST",
             data: formData
           })
             .then(result => {
               let url = result.data.url; // Get url from response
               Editor.insertEmbed(cursorLocation, "image", url);
               resetUploader();
             })
             .catch(err => {
               console.log(err);
             });
         } */
       }
     };
   </script> 
   ```

   

## 10 如何在 vue 中写公共的 css 样式

+ 当然是在 src 中新建一个css 文件夹
+ 然后再编写样式，
+ 接着去main.js 中引入 css 文件
+ 然后 引入 的 css 样式文件就会在所有组件中都生效

## 11 如何在  mongoose 中把用户密码散列存储（加密）

+ ### 使用插件 bcrypt 帮助我们加密

  1. 安装

     ```powershell
     npm i bcrypt
     ```

  2. 使用 hashSync进行散列

     ```javascript
     hashSync(data, salt)
     ```

     - `data` - [必需] - 要加密的数据。
     - `salt` - [必需] - 用于散列密码的salt。如果指定为数字，则将生成具有指定轮数并使用的salt（请参阅**Usage**下的示例）。一般加密10-12位，越长密码强度越高，但时间也越长。所以一般选10-12。

  3. 在 mongoose 中使用散列方法进行密码加密

  ```javascript
  	// 密码
      password: {
          type: String,
          select:false, // 设置select为false可以使该数据不显示，以保证安全性
          set(val){
              console.log(val)
              return require("bcrypt").hashSync(val,10)
          }
          // set(val) 中的val 表示客户端发送过来的密码
          // 然后进行加密存储，而且对于相同的密码每次加密的出来的字符串都是不同的，保证了其安全性
          // $2b$10$/fLgOj14zG/8ATe0AMPe9.0/1tEICdmeO2/7xGQ2iMwpPBEtj52f6u
      }
  ```

  ## 12 用 axios 的拦截器方法进行登录错误提示处理
  
  ###  全局捕获错提示，使用 axios的interceptors.response.use方法
  
  ```javascript
  import axios from 'axios'
  import Vue from 'vue'
  
  const http = axios.create({
      baseUrl:'http:localhost:3000/admin/api'
  })
  // 在客户端发送回信息之后进行拦截处理
  http.interceptors.response.use(res=>{
      return res
  },err=>{
      console.log(err.response)
    // 引用 Element message提示组件  
      Vue.prototype.$message({
          type:'error',
          message:err.response.data.message
        // response.data 代表服务端返回的错误对象  
      })
      return Promise.reject(err)
  })
  ```

## 13 在node.js中使用  [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) 生成token给客户端做验证

- 安装

```powershell
npm install jsonwebtoken
```

用 sign 生成 token

```javascript
const jwt = require('jsonwebtoken')
// app.set('sercet','fsjdfjdsj')
// 第二个参数很重要，通过生成一个字符串去生成 token
const token = jwt.sign({ id:model._id },app.get('secret'))
// 然后响应 token 回去
res.send({token})
```

### 如何在客户端中保存 token

- 使用 sessionStorage.token = res.data.token 保存 登录后生成的 token 
  - 在关闭浏览器后消失
- 使用 localStorage.token = res.data.token 保存
  - 只要不手动删除，就会一直保存那个域名下的 Application 的 localStorage 里面	
  - 可以使用 localStotage.clear() 方法，清空 里面存储的所有数据

## 14 使用 http-assert 来处理错误信息

1. 安装

   ```powershell
   npm i http-assert
   ```

2. 目的

   - 可以使我们的报错信息变得简洁

   - 例如：

     ```javascript
     // 没事使用 http-assert 包之前，需要写这么多行
     if(user){
         return res.status.send({
             message:'用户名不存在'
         })
     }
     // 在引用 http-assert 包之后是这样的
     const assert = require("http-assert")
     assert(user,422,'用户不存在')
     //表示如果 user 为false 返回 422 状态码，并返回 message:'密码错误'
     ```

   - 但是还需在**所有的路由后面**加入一个 **错误处理中间件**，否则客户端接受到的数据是这样的

     ```javascript
     UnprocessableEntityError: 密码错误！
         at assert (G:\Vue.js\VueDemo\Node-vue-king\server\node_modules\http-assert\index.js:8:9)
         at app.post (G:\Vue.js\VueDemo\Node-vue-king\server\routes\admin\index.js:103:9)
         at process._tickCallback (internal/process/next_tick.js:68:7)
     ```

   - 这个中间件需要我们自己写

     ```javascript
     app.use(async(err,req,res,next)=>{
     	res.status(err.statusCode).send({
         	message:err.message
     	})     
     })
     ```

     这样就可以了

## 15 如何在服务端做登录校验

1. 首先现在 **客户端** 的所有请求头中，加上 Authorization jwt token

   ```javascript
   // 在 http.js 中使用 axios 的 interceptors.request.use(}
   http.interceptors.request.use(config=>{
    	// 加上 token 前加上 'Bearer ' 是行业规范   
       if（localStorage.token){
           config.headers.Authorization = 'Bearer ' localStorage.token
       }
       return config
   },err=>{
       return Promise.reject(err)
   })
   ```

2. 然后再去 服务端 判断请求中是否含有 token，并且是有效的token，才可以访问数据接口，如果是无效的返回422错误，而且无论用户访问哪个界面，都跳转到 Login 界面。

   代码实现

   ```javascript
   // 需要在每个接口中，加一个中间件来进行 token 验证
   // 例如 在 /admin/api/rest/categories/list 接口
   router.post('/categories/list',async(req,res,next)=>{
       // 首先先获取客户端发送的请求头中的 token 数据
       let token = req.headers.authorization.split(' ').pop()
       // 然后根据 jsonwebtoken 中的 verify 方法 把其中的 id 参数获取出来
       let {id} = jwt.verify(token,app.get('secret'))
       // verify 中的token，就是客户端传过来的token。第二个参数，是jwt.sign生成token的字符串，
       // 然后根据 解码出来的 id 去数据库中查找 是否有该用户
       const user = await AdminUser.findById(id)
       next()    
   },async(req,res)=>{
       
   })
   ```


## 16 如何在前端页面中设置    路由守卫

1. 先在 前端路由文件 router.js 中修改

   1.1 第一步

   ```javascript
   //先把
   export default new Router({
       routes:[
           
       ]
   })
   
   // 修改为
   const router = new Router({
       routes:[
           ...
       ]
   })
   export default router
   ```

   1.2 第二步

   - 在不需要设置登录权限的 组件 路由中设置 meta 属性

   ```javascript
   import Login from './components/view/Login'
   const router = new Router({
       routes:[
           {
               path:'/login',
               name:'login',
               component:Login,
               meta:{isPublic:true}
           }
       ]
   })
   
   ```

   1.3 第三步

   - 在 export default router 之前 加入以下代码即可 实现路由守卫

   ```javascript
   router.beforeEach((to,from,next)=>{
     // 可以发现除了 login 页面的 to.meta 是 {isPublic：true}
     console.log(to.meta)
     // 其他页面都是空对象，所以可以通过这样来设置其他界面的访问权限
     if(!to.meta && !localStorage.token){
       return next('/login')
     }
     next()
   })
   ```


## 17 如何在vue 项目中使用 Sass 

1. 安装

   ```shell
   npm i sass sass-loader --save
   ```

2. 安装完之后需要**重启一下 vue项目**，不然在之前使用 .scss 文件会报错

3. 然后 在 main.js 文件导入新建的 style.scss 文件

   ```javascript
   import './style.scss'
   ```

4. 接下来在项目中就可以全局使用 css 样式

### 1. 如何在 scss 文件中定义一个普通变量

- 例：

```javascript
$color：blue
```

### 2. 如何在 scss 文件中使用定义的变量

```javascript
.text-color{
    color:$color
}
```

### 3. 如何在 scss 文件中定义一个多值变量（类似于js 中的对象）

```javascript
$color:(
    "white":#fff,
    'light':#333,
    'yellow':#db9e3f
);
```

### 4. 如何在 scss 文件中使用多值变量循环生成工具类

```javascript
@each $colorkey,$colorvalue in $color{
    .text-#{$colorkey}{
    	color:$colorvalue
	}
}
```

