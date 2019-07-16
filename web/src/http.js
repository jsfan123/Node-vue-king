import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$http = axios.create({
    baseURL:'http://localhost:3000/web/api/'
})