<template>
<el-table :data="ads">
    <el-table-column align="center" prop="name" label="广告位名" width="220">
    </el-table-column>
    <el-table-column align="center" prop="items[0].url" label="图标" >
    </el-table-column>
    <el-table-column align="center" fixed="right" label="操作" width="220">
        <template slot-scope="scope">
            <el-button @click="$router.push(`/ads/edit/${scope.row._id}`)" type="primary" size="small">编辑</el-button>
            <el-button @click="remove(scope.row)" type="success" size="small">删除</el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script>
export default {
    data() {
        return {
            ads: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get("/rest/ads/list")
            this.ads = res.data
        },
        remove(val) {
            let id = val._id;
            this.$confirm(`是否删除分类"${val.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`/rest/ads/delete/${id}`)
                this.$message({
                    type: 'success',
                    message: `删除"${val.name}" 广告位成功!`
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
