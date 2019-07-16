<template>
<el-table :data="articles">
    <el-table-column align="center" prop="title" label="文章标题">
    </el-table-column>
    <!-- <el-table-column align="center" prop="body" label="文章详情"></el-table-column> -->
    <el-table-column align="center" fixed="right" label="操作" width="220">
        <template slot-scope="scope">
            <el-button @click="$router.push(`/articles/edit/${scope.row._id}`)" type="primary" size="small">编辑</el-button>
            <el-button @click="remove(scope.row)" type="success" size="small">删除</el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script>
export default {
    data() {
        return {
            articles: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get("/rest/articles/list")
            this.articles = res.data
        },
        remove(val) {
            let id = val._id;
            this.$confirm(`是否删除分类"${val.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`/rest/articles/delete/${id}`)
                this.$message({
                    type: 'success',
                    message: `删除"${val.name}" 文章成功!`
                });
                this.fetch()
            })

        }
    },
    // created Vue 实例的钩子函数，用来渲染数据
    created() {
        this.fetch();
    }
}
</script>

<style>

</style>
