<template>
<el-table :data="heroes">
    <el-table-column align="center" prop="title" label="英雄称号" width="240">
    </el-table-column>
    <el-table-column align="center" prop="name" label="英雄名称">
    </el-table-column>
    <el-table-column align="center" prop="avatar" label="头像">
        <template slot-scope="scope">
            <!-- 这里我们想显示 英雄的图片所以使用 表格的自定义显示 -->
            <img :src="scope.row.avatar" alt="" style="height:60px">
        </template>
    </el-table-column>
    <el-table-column align="center" fixed="right" label="操作" width="200">
        <template slot-scope="scope">
            <el-button @click="$router.push(`/heroes/edit/${scope.row._id}`)" type="primary" size="small">编辑</el-button>
            <el-button @click="remove(scope.row)" type="success" size="small">删除</el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script>
export default {
    data() {
        return {
            heroes: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get("/rest/heroes/list")
            this.heroes = res.data.reverse()
            console.log(res.data)
        },
        remove(val) {
            let id = val._id;
            this.$confirm(`是否删除分类"${val.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`/rest/heroes/delete/${id}`)
                this.$message({
                    type: 'success',
                    message: `删除"${val.name}" 英雄成功!`
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
