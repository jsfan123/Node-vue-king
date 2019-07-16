<template>
<div>
    <h2>{{id?'编辑':'新建'}}广告位</h2>
    <el-form @submit.native.prevent="save" label-width="80px">
        <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="广告">
            <el-button type="success" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
            <el-button type="primary" native-type="submit">{{id?'保存':'创建'}}</el-button>
        </el-form-item>
        <el-row type="flex" style="flex-wrap:wrap-reverse;justify-content:center;">
            <el-col :md="10" v-for="(item,i) of model.items" :key="i" class="myborder">
                <el-form-item label="广告链接">
                    <el-input v-model="item.url"></el-input>
                </el-form-item>
                <el-form-item label="广告图片">
                    <el-upload class="avatar-uploader" :show-file-list="false" action="http://localhost:3000/admin/api/upload" :on-success="res=>$set(item,'image',res.fileUrl)">
                        <img v-if="item.image" :src="item.image" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item style="text-align:right">
                    <el-button type="danger" @click="model.items.splice(i,1)">删除</el-button>
                </el-form-item>
            </el-col>
        </el-row>

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
            model: {
                items:[]
            }
        }
    },
    methods: {
        async save() {
            // 使用 ES7 语法 async awit
            // 通过 this.id 也可以接受 AdsList 界面 点击编辑按钮传过来的参数
            if (this.id) {
                // 编辑 广告位保存
                await this.$http.put(`/rest/ads/edit/${this.id}`, this.model);
            } else {
                // 新建 广告位保存
                await this.$http.post("/rest/ads/create", this.model);
            }
            // 然后跳转到列表页
            this.$router.push('/ads/list')
            this.$message({
                message: "广告位创建成功",
                type: "success"
            });
        },
        async fetch() {
            const res = await this.$http.get(`/rest/ads/edit/${this.id}`)
            this.model = res.data
        },
    },
    created() {
        this.id && this.fetch()
    }
}
</script>

<style>
.myborder{
    margin-top: 0!important;
    padding-top: 2rem!important;
}
.avatar-uploader-icon{
    min-width: 5rem!important;
}
.avatar {
    min-width: 5rem!important;
}
</style>
