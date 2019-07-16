<template>
<el-table :data="items">
    <el-table-column align="center" prop="parent.name" label="父级分类" width="200">
    </el-table-column>

    <el-table-column align="center" prop="name" label="分类名" >
    </el-table-column>
    
    <el-table-column align="center" fixed="right" label="操作" width="200">
        <template slot-scope="scope">
            <el-button @click="$router.push(`/categories/edit/${scope.row._id}`)" type="primary" size="small">编辑</el-button>
            <el-button @click="remove(scope.row)" type="success" size="small">删除</el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script>
export default {
    data() {
        return {
            items: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get("/rest/categories/list")
            this.items = res.data
        },
        remove(val) {
            let id = val._id;
            this.$confirm(`是否删除分类"${val.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                await this.$http.delete(`/rest/categories/delete/${id}`)
                this.$message({
                    type: 'success',
                    message: `删除"${val.name}" 分类成功!`
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
