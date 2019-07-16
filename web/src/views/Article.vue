<template>
    <div>
        <div class="flex px-2 py-3 ai-center bb-1">
            <i style="font-weight:blod" class="text-blue-b fs-cg iconfont icon-fanhui "></i>
            <strong style="padding-right:3rem" class="flex-1 pl-2 text-ellipsis text-blue fs-lg">{{article.title}}</strong>
            <span class="text-gray fs-xs">{{article.updated | date}}</span>
        </div>
        <div v-html="article.body" class="px-3 art-content"></div>
    </div>
</template>
    
<script>
import dayjs from 'dayjs'
    export default {
        filters:{
            date(val){
                return dayjs(val).format("YYYY-MM-DD")
            }
        },
        // 接受路径中传过来的参数
        props:{
            id:{}
        },
        data(){
            return {
                article:{},

            }
        },
        methods:{
            async fetchArticle(){
                const res = await this.$http.get(`/article/${this.id}`)
                this.article = res.data;
            }
        },
        created(){
            this.fetchArticle();
        }
    }
</script>

<style lang="scss">
    .art-content{
        .ql-align-center{
            text-align: center;
        }
    }
</style>