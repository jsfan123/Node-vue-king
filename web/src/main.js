import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import './assets/style/style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// 引入字体图标 iconfont
import './assets/iconfont/iconfont.css'

// 引入 axios 
import './http.js'

//引入 dayjs
import dayjs from 'dayjs'
// console.log(dayjs)
// Vue.prototype.$dayjs = dayjs
Vue.use(dayjs)

// require styles
import 'swiper/dist/css/swiper.css'

import Card from './components/Card.vue'

Vue.component('m-card',Card)

import ListCard from './components/ListCard.vue'

Vue.component('m-list-card',ListCard)

Vue.use(VueAwesomeSwiper, /* { default global options } */)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
