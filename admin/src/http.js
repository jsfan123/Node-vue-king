import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
    baseURL:"http://localhost:3000/admin/api"
})

// 为客户端请求加上请求头

http.interceptors.request.use(config=>{
    // 表示当 有 token 的时侯才发添加请求头
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
},err=>{
    return Promise.reject(err)
})

// 在服务端响应回信息之后进行拦截处理
http.interceptors.response.use(res=>{
    return res
},err=>{
    Vue.prototype.$message({
        type:'error',
        message:err.response.data.message
    })
    console.log(err.response)
    if(err.response.status === 401){
        // console.log(err.response.status)
        router.push('/login')
    }

    return Promise.reject(err)
})

export default http