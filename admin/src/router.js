import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
// 分类管理组件
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

// 物品组件
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
// 英雄组件
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'

import AdsEdit from './views/AdsEdit.vue'
import AdsList from './views/AdsList.vue'

import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'

import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:Login,
      // 设置 Login 页面不需要访问权限，其他的都页面都需要
      meta:{isPublic:true}
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect:'/categories/list',
      children:[
        // categories 代表分类
        {path:'/categories/create',component:CategoryEdit},
        {path:'/categories/edit/:id',component:CategoryEdit,props:true},
        {path:'/categories/list',component:CategoryList},

        // items 代表装备
        {path:'/items/create',component:ItemEdit},
        {path:'/items/edit/:id',component:ItemEdit,props:true},
        {path:'/items/list',component:ItemList},
        
        // heros 代表英雄
        {path:'/heroes/create',component:HeroEdit},
        {path:'/heroes/edit/:id',component:HeroEdit,props:true},
        {path:'/heroes/list',component:HeroList},

        //  代表文章的
        {path:'/articles/create',component:ArticleEdit},
        {path:'/articles/edit/:id',component:ArticleEdit,props:true},
        {path:'/articles/list',component:ArticleList},

        // Ads 代表广告位的简写
        {path:'/ads/create',component:AdsEdit},
        {path:'/ads/edit/:id',component:AdsEdit,props:true},
        {path:'/ads/list',component:AdsList},
        

        // admin_user 管理员
        {path:'/admin_user/create',component:AdminUserEdit},
        {path:'/admin_user/edit/:id',component:AdminUserEdit,props:true},
        {path:'/admin_user/list',component:AdminUserList},
      ]
    }
    
  ]
})

router.beforeEach((to,from,next)=>{
  // 可以发现除了 login 页面的 to.meta 是 {isPublic：true}
  console.log(to.meta)
  // 其他页面都是空对象，所以可以通过这样来设置其他界面的访问权限
  if(!to.meta && !localStorage.token){
    return next('/login')
  }
  next()
})
export default router