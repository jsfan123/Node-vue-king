import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

// 引入axios
import http from "./http"
Vue.prototype.$http = http

Vue.mixin({
  methods:{
    bindToken(){
      return {
        Authorization:'Bearer ' + localStorage.token
      }
    }
  }
})

import './css/customUpload.css'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

