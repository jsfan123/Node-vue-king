<template>
<el-table :data="items">
    <el-table-column align="center" prop="name" label="物品名" width="220">
    </el-table-column>
    <el-table-column align="center" prop="icon" label="图标" >
        <template slot-scope="scope">
            <!-- 这里我们想显示 物品的图片所以使用 表格的自定义显示 -->
            <img :src="scope.row.icon" alt="" style="height:60px">
        </template>
    </el-table-column>
    <el-table-column align="center" fixed="right" label="操作" width="220">
        <template slot-scope="scope">
            <el-button @click="$router.push(`/items/edit/${scope.row._id}`)" type="primary" size="small">编辑</el-button>
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
            const res = await this.$http.get("/rest/items/list")
            this.items = res.data
        },
        remove(val) {
            let id = val._id;
            this.$confirm(`是否删除分类"${val.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`/rest/items/delete/${id}`)
                this.$message({
                    type: 'success',
                    message: `删除"${val.name}" 物品成功!`
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
