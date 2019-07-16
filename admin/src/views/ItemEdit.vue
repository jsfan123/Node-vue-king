<template>
<div>
    <h2>{{id?'编辑':'新建'}}物品</h2>
    <el-form @submit.native.prevent="save" label-width="120px">
        <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="图标">
           <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/admin/api/upload"
            :headers="bindToken()"
            :show-file-list="false"
            :on-success="afterUpload">
            <img v-if="model.icon" :src="model.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
            model: {}
        }
    },
    methods: {
        afterUpload(res){
            // 这里使用这种方法，导致数据this.model.icon没有绑定上,因为之前model是一个空对象，没有icon 这个属性
            // this.model.icon = res.fileUrl
            // 为了解决这种情况我们使用 Vue 提供的方法
            this.$set(this.model,"icon",res.fileUrl)
           
        },
        async save() {
            // 使用 ES7 语法 async awit
            // 通过 this.id 也可以接受 CategoryList 界面 点击编辑按钮传过来的参数
            if (this.id) {
                // 编辑 分类保存
                await this.$http.put(`/rest/items/edit/${this.id}`, this.model);
            } else {
                // 新建 分类保存
                await this.$http.post("/rest/items/create", this.model);
            }
            // 然后跳转到列表页
            this.$router.push('/items/list')
            this.$message({
                message: "分类创建成功",
                type: "success"
            });
        },
        async fetch() {
            const res = await this.$http.get(`/rest/items/edit/${this.id}`)
            this.model = res.data
        },
    },
    created(){
         console.log(this.bindToken())
        this.id && this.fetch()
    }
}
</script>

<style>

</style>
