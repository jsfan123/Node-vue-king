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
                await this.$http.put(`/rest/categories/edit/${this.id}`, this.model);
            } else {
                // 新建 分类保存
                await this.$http.post("/rest/categories/create", this.model);
            }
            // 然后跳转到列表页
            this.$router.push('/categories/list')
            this.$message({
                message: "分类创建成功",
                type: "success"
            });
        },
        async fetch() {
            const res = await this.$http.get(`/rest/categories/edit/${this.id}`)
            this.model = res.data
        },
        async fetchParents(){
            const res = await this.$http.get("/rest/categories/list")
            this.parents = res.data
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
