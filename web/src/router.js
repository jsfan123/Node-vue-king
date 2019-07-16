import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Main from './views/Main.vue'
import Article from './views/Article.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children:[
        {path:'/',name:'home',component:Home},
         {path:'/about',name:'about',component:About},
         {path:'/news/article/:id',name:"artcile",component:Article,props:true}
      ]
    }
    
  ]
})
