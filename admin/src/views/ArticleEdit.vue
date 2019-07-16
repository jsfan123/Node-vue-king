<template>
<div>
    <h2>{{id?'编辑':'新建'}}文章</h2>
    <el-form @submit.native.prevent="save" label-width="120px">
        <el-form-item label="标题名称">
            <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
            <el-select v-model="model.categories" multiple>
                <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="文章详情">
            <!-- 使用富文本编辑器来做 -->
            <vue-editor class="editor" v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
            <!-- <vue-editor class="editor" v-model="model.body"></vue-editor> -->
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">{{id?'保存':'创建'}}</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {
    VueEditor
} from "vue2-editor";
export default {
    props: {
        id: {}
    },
    components: {
        VueEditor
    },
    data() {
        return {
            model: {},
            categories: []
        }
    },
    methods: {
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            var formData = new FormData();
            formData.append('file', file);
            const res = await this.$http.post("/upload", formData)
            let fileUrl = res.data.fileUrl; // Get fileUrl from response
            Editor.insertEmbed(cursorLocation, "image", fileUrl);
            resetUploader();

        },
        async save() {
            // 使用 ES7 语法 async awit
            // 通过 this.id 也可以接受 CategoryList 界面 点击编辑按钮传过来的参数
            if (this.id) {
                // 编辑 分类保存
                await this.$http.put(`/rest/articles/edit/${this.id}`, this.model);
            } else {
                // 新建 分类保存
                await this.$http.post("/rest/articles/create", this.model);
            }
            // 然后跳转到列表页
            this.$router.push('/articles/list')
            this.$message({
                message: "分类创建成功",
                type: "success"
            });
        },
        async fetch() {
            const res = await this.$http.get(`/rest/articles/edit/${this.id}`)
            this.model = res.data
        },
        async fetchCategory() {
            const res = await this.$http.get(`/rest/categories/list`)
            this.categories = res.data
        },
    },
    created() {
        this.fetchCategory();
        this.id && this.fetch()
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.editor{
    border-radius: 8px;
}
</style>
