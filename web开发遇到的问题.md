## 1  如何在vue 项目中使用 Sass 

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

## 2 如何在  vue  中使用轮播图插件

1. ### 安装

   ```shell
   npm install vue-awesome-swiper --save
   ```

2. ### 全局引用的话，在 main.js 中配置

   ```javascript
   import Vue from 'vue'
   import VueAwesomeSwiper from 'vue-awesome-swiper'
   
   // require styles
   import 'swiper/dist/css/swiper.css'
   
   Vue.use(VueAwesomeSwiper, /* { default global options } */)
   ```

3. ### 在 SPA 组件 中使用

   - 先实现简单的文字效果

   ```javascript
   // 可以先实现简单的文字效果，然后逐渐细化
   <swiper>
       <swiper-slide>fsdfd</swiper-slide>
   	<swiper-slide>fsdfd</swiper-slide>
   </swiper>
   ```

   - 然后添加图片

   ```javascript
     <swiper>
         // 设置 图片的宽度为100% 即可使样式恢复正常
         <swiper-slide>
             <img class="w-100" src="../assets/images/1.jpg" alt="">
     	</swiper-slide>
     	<swiper-slide>
             <img class="w-100" src="../assets/images/2.jpg" alt="">
     	</swiper-slide>
     </swiper>
   ```
   
   - 在添加导航按钮 pagination
   
   ```javascript
   // 第一步 ：给 swiper 绑定属性 options :options='swiperOption'  
   <swiper :options="swiperOption">
         // 设置 图片的宽度为100% 即可使样式恢复正常
         <swiper-slide>
             <img class="w-100" src="../assets/images/1.jpg" alt="">
     	</swiper-slide>
     	<swiper-slide>
             <img class="w-100" src="../assets/images/2.jpg" alt="">
     	</swiper-slide>
   // 第二步：添加下面这行语句
   	<div class="swiper-pagination swiper-home" slot="pagination"></div>
     </swiper>
   // 第三步:
   <script>
       export default {
           data(){
               return {
                   swiperOption: {
                       pagination:{
                           el:'.swiper-home'
                       }
                   }
               }
           },
           
       }
   </script>
   
   ```
   
     
   
   ### 注意：要在 vue 组件中的 style 中写 scss 样式 必须加上 lang="scss"
   
   ```javascript
   <style lang="scss">
       // 引入外部css 样式文件 使用
       @import "../style.scss";	
   	// 可以使用 map-get($map: , $key:) 方法获取在 style.scss 中定义的map 	   变量
   	background-color: map-get($colors, "info");
       ...
   </style>
       
   ```
   

## 3 使用精灵图

**注意：**

- 在做移动端界面时，考虑到图片失帧的情况所以，一般都是以 iphone6 宽度的2倍来设置精灵图的。

- 所以，在引入 精灵图 做背景图片时，需要设置公共样式如下 ：

  ```css
  background-image:url('../assets/index.png') no-peat 0 0;
  background-size: 375px;
  ```

- 使用工具来确定精灵图中小图片的位置 [spriteCow](<http://www.spritecow.com/>)

![1560838843709](https://github.com/jsfan123/Node-vue-king/blob/master/readmeImg/1560838843709.png)

- 2* 表示图片大小为原图片大小的一半
- % 表示位置用 百分比 来显示

## 4 巧妙使用 v-for 构造多条数据

```javascript
// 表示构造十条数据
v-for="i in 10" :key="i"
// 例子：
<div class="nav-item" v-for="i in 10" :key="i">
	<i class="sprite sprite-img"></i>
	<div>爆料站</div>
</div>
```

## 5 如何在 vue 中封装一个自己的 card 组件

### 1.在 components（组件文件夹中新建一个Card.vue组件）

### 2.把组件中能动态显示地方通过 **传递参数** 来进行显示

```javascript
<template>
     <div class="card mt-3 bg-white p-3">
         <div class="card-header flex ai-center pb-3">
             <!-- 通过 props 传递参数 来设置不同的图标 -->
             <i class="iconfont fs-lg" :class="`icon-${icon}`"></i>
             <div class="fs-cg flex-1 ml-2">{{title}}</div>
             <i class="iconfont icon-sangedian fs-lg"></i>
         </div>
		<div class="card-body">
         	<solt></solt>
         </div>
     </div>
</template>
```

### 3. 如何**传递参数** 通过 **props** 来传递参数，例：

```javascript
<script>
    export default {
		props:{
            title:{
               	// 表示传递的参数是一个字符串
                type:String,
                // required : true  ---> 表示参数必须传递
                required:true
            },
           	icon:{
                // 表示传递的参数是一个字符串
                type:String,
                required:true
            }
        }
	}	
</script>
```

### 5. 然后可以在全局注册 Card 组件

```javascript
// 先引入这个组件
import Card from './components/Card.vue'
// 再 注册 Card 组件
Vue.component('my-card',Card)
// 其中 my-card 就是你注册的 组件名
```

### 5. 接下来，我们将去使用 这个自定义的组件 `my-card`

```javascript
// 因为在全局注册了，所以我们可以在任意一个界面中使用
<my-card title="新闻资讯" icon="card-hero">
    
</my-card>
```

效果图如右：![1560850410325](https://github.com/jsfan123/Node-vue-king/blob/master/readmeImg/1560850410325.png)

### 6.如何在 `my-card` 的 起始**标签**和 **结束标签**之间 添加内容

#### 6.1是添加不上的，因为如果 `<my-card>` **没有**包含一个 `<slot>` 元素，则该组件**起始标签**和**结束标签**之间的任何内容都会被抛弃。

```javascript
// 因为在全局注册了，所以我们可以在任意一个界面中使用
<my-card title="新闻资讯" icon="card-hero">
   wo shi xiao ca ca
</my-card>
```

#### 6.2然后你在 `<my-card>` 的模板中可能会写为：

```javascript
<div class="card">
    <div class="card-header">
        ....
    </div>
	<div class="card-body">
	    <solt></solt>
	</div>
</div>
```

当组件渲染的时候，`<slot></slot>` 将会被替换为“wo shi xiao ca ca”。插槽内可以包含任何模板代码，包括 HTML：

```javascript
// 因为在全局注册了，所以我们可以在任意一个界面中使用
<my-card title="新闻资讯" icon="card-hero">
   wo shi xiao ca ca
</my-card>
```

​     

## 7 动态绑定类名

```javascript
<template>
    // :class="{active:布尔值}"
    // 其中的 active 表示当布尔值为真时 绑定的类名 
    // 最终，这个div 的类名 表示为 class="data acitve"
    <div class="data" :class="{active:布尔值}">
    </div>
<template>
```

## 8 如何让插槽中的内容能够访问子组件中才有的数据

### 1. 先在子组件中设置

```javascript
<template>
    <swiper-slide v-for="(item,i) in categorise" :key="i">
        // 这里将 使用 具名插槽 并且绑定一个属性（list），
        // 属性中传的值(item)就是子组件中才有的数据
        <slot name="list" :list="item">
        </slot>
	</swiper-slide>
</template>

<script>
export default {
	props:{
        categorise:{
            type:Array,
            required:true
        }
    }
}

```

### 2. 如何在插槽内容中访问传递的数据呢？

```javascript
// {list} 中的 list 必须是在子组件中绑定的属性名，这样才能访问子组件中的数据
<tempalte v-slot:list="{list}">
    <div v-for="(item,i) in list.newsList" :key="i">
        {{item.name}}
    </div>
</tempalte>
```

## 9 如何添加 swiper 的交互事件

### 1. 如何添加轮播图滑动事件

- 先给 swiper 添加一个 ref 属性：相当于 id 的作用
- 然后再通过 @slide-change="()=>index = $refs.list.swiper.realndex",来改变导航栏默认激活的元素

```javascript
<swiper ref="list" @slide-change="()=> index = $refs.list.swiper.realIndex">
	<swiper-slide>
    
    </swiper-slide>
</swiper>
```

### 2. 如何给轮播图导航栏添加点击事件，并显示对应的轮播图



## 10 如何使用 dayjs 处理对人类不友好的时间

### 1. npm 安装 dayjs

```shell
npm install dayjs --save
```

### 2. 在需要使用的模块引入

```javascript
<script>
   	import dayjs from 'dayjs'
	export default {
        // 使用 filter 过滤器来进行 服务端发送过来的日期进行格式化
        filter:{
            date(val){
                return dayjs(val).format('MM/DD')
            }
        },
        data(){
            
        }
</script>
```

### 3. 接下来在需要 使用 该日期的地方这样写

```javascript
<span class="fs-sm text-black-7">{{item.date | date}}</span>
// 其中 item.data 就是我们传给 date（val）的实参 | 后的date 就是我们在 filter 中定义的方法名
```

## 11 如何使 swiper 滑动组件随内容的多少而决定 swiper-slide 的高度

- 如下设置，即可

```javascript
<swiper :options="{autoHeight:true}">
```







   
