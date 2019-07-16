<template>
<div>
    <h2>{{id?'编辑':'新建'}}英雄</h2>
    <el-form @submit.native.prevent="save" label-width="80px">
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="基本信息" name="first">
                <el-form-item label="名称">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="称号">
                    <el-input v-model="model.title"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload class="avatar-uploader" action="http://localhost:3000/admin/api/upload"
                    :headers="bindToken()"
                     :show-file-list="false" :on-success="afterUpload">
                        <img v-if="model.avatar" :src="model.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="model.categories" placeholder="请选择" multiple>
                        <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="难度">
                    <el-rate :max="9" style="margin-top:0.7rem" v-model="model.scores.diffcult" text-color="#409EFF" show-score></el-rate>
                </el-form-item>
                <el-form-item label="技能">
                    <el-rate :max="9" style="margin-top:0.7rem" v-model="model.scores.skill" text-color="#409EFF" show-score></el-rate>
                </el-form-item>
                <el-form-item label="攻击">
                    <el-rate :max="9" style="margin-top:0.7rem" v-model="model.scores.attack" text-color="#409EFF" show-score></el-rate>
                </el-form-item>
                <el-form-item label="生存">
                    <el-rate :max="9" style="margin-top:0.7rem" v-model="model.scores.survive" text-color="#409EFF" show-score></el-rate>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="出装推荐" name="second">
                <el-form-item label="顺风出装">
                    <el-select v-model="model.items1" multiple>
                        <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="顺风出装">
                    <el-select v-model="model.items2" multiple>
                        <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="英雄技巧" name="third">
                <el-form-item label="使用技巧">
                    <el-input type="textarea" v-model="model.usageTips"></el-input>
                </el-form-item>
                <el-form-item label="对抗技巧">
                    <el-input type="textarea" v-model="model.battleTips" autosize></el-input>
                </el-form-item>
                <el-form-item label="生存技巧">
                    <el-input type="textarea" v-model="model.teamTips" autosize></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="英雄技能" name="fourth">
               <el-form-item style="margin-bottom:0" class="fourth-form-first">
                    <el-button type="success"  @click="model.skills.push({})"><i class="el-icon-plus el-icon--left"></i>添加技能</el-button>
                    <el-button type="primary" native-type="submit">{{id?'保存':'创建'}}</el-button>
               </el-form-item>
                <el-row type="flex" style="flex-wrap:wrap-reverse;justify-content:space-around">
                    <el-col :md="10" v-for="(item,i) of model.skills" :key="i" class="myborder">
                        <el-form-item label="技能名称">
                            <el-input v-model="item.name"></el-input>
                        </el-form-item>
                        <el-form-item label="图标">
                            <el-upload 
                            action="http://localhost:3000/admin/api/upload"
                            :headers="bindToken()"
                             :show-flow-list="false" :on-success="res=>$set(item,'icon',res.fileUrl)" class="avatar-uploader">
                                <img :src="item.icon" v-if="item.icon" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="技能描述">
                            <el-input type="textarea" autosize v-model="item.description"></el-input>
                        </el-form-item>
                        <el-form-item label="小提示">
                            <el-input type="textarea" autosize v-model="item.tips"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <!-- 删除数组中的第i项 -->
                            <el-button type="danger" @click="model.skills.splice(i,1)">删除</el-button>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-tab-pane>
        </el-tabs>

        <el-form-item>
            
            <el-button style="margin-top:10px;" type="primary" native-type="submit">{{id?'保存':'创建'}}</el-button>
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
                scores: {
                    diffcult: 0
                },
                categories: [],
                skills: [],
            },
            categories: [],
            items: [],
            activeName: 'first',
        }
    },
    methods: {
        afterUpload(res) {
            // 这里使用这种方法，导致数据this.model.icon没有绑定上,因为之前model是一个空对象，没有icon 这个属性
            // this.model.icon = res.fileUrl
            // 为了解决这种情况我们使用 Vue 提供的方法
            this.$set(this.model, "avatar", res.fileUrl)
        },
        async save() {
            // 使用 ES7 语法 async awit
            // 通过 this.id 也可以接受 CategoryList 界面 点击编辑按钮传过来的参数
            if (this.id) {
                // 编辑 分类保存
                await this.$http.put(`/rest/heroes/edit/${this.id}`, this.model);
            } else {
                // 新建 分类保存
                await this.$http.post("/rest/heroes/create", this.model);
            }
            // 然后跳转到列表页
            this.$router.push('/heroes/list')
            this.$message({
                message: "分类创建成功",
                type: "success"
            });
        },
        async fetch() {
            const res = await this.$http.get(`/rest/heroes/edit/${this.id}`)
            this.model = Object.assign({}, this.model, res.data)
        },
        async fecthCategories() {
            const res = await this.$http.get(`/rest/categories/list`)
            this.categories = res.data
        },
        async fetchItems() {
            const res = await this.$http.get('/rest/items/list')
            this.items = res.data
        }
    },
    created() {
        this.id && this.fetch()
        this.fecthCategories()
        this.fetchItems()
        console.log(this.bindToken())
    }
}
</script>

<style>

</style>
