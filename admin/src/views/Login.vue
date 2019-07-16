<template>
    <div>
        <el-card class="login_card">
            <div slot="header" class="clearfix">
                <h2>登录</h2>
            </div>
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input required type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item style="text-align:center">
                    <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
    
<script>
    export default {
        data(){
            return {
                model:{}
            }
        },
        methods:{
            async login(){
                const res = await this.$http.post("login",this.model)
                // 全局捕获错提示，使用 axios的interceptors.response.use方法
                console.log(res.data.token)
                localStorage.token = res.data.token
                // 接下来跳转页面
                this.$router.push('/')
                this.$notify({
                    title:`恭喜你'${this.model.username}'`,
                    type:'success',
                    message:'登录成功',
                    position:"top-left"
                })
            }
        }
    }
</script>

<style>

    .login_card{
        width: 25rem;
        margin: 5rem auto;
        border-radius: 7px; 
    }
    .login_card h2{
        margin: 0;
        text-align: center;
    }
</style>