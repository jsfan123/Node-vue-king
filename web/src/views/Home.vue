<template>
<div>
    <swiper :options="swiperOption" ref="home">
        <swiper-slide v-for="(item,i) in 3" :key="i">
            <img class="w-100" src="../assets/images/f7a4d54fd79d13b12876e9877c6f0a70.jpeg" alt="">
        </swiper-slide>
                    <div class="swiper-pagination text-right swiper-home px-2" @click="$refs.home.swiper.slideTo($refs.home.swiper.realIndex)" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="snav bg-white text-black-1 mt-3 pt-3">
        <div class="flex flex-wrap">
            <div class="snav-item text-center mb-3 pt-2" v-for="i in 10" :key="i">
                <!-- 爆料站 -->
                <i class="sprite sprite-news"></i>
                <div class="pt-1">爆料站</div>
            </div>
        </div>
        <div class="bg-light py-2 text-center">
            <div><i class="sprite sprite-packup"></i>收起</div>
        </div>
    </div>
    <!-- end of snav -->
     <m-list-card title="新闻资讯" icon="menu" :categorise="listData">
        <template #list="{list}">
            <router-link tag="div" :to="`/news/article/${item._id}`" class="flex jc-between fs-lg ai-center mt-4" v-for="(item,i) in list.newsList" :key="i">
                <span class="text-lime-1">[{{item.categoryName}}]</span>
                <span class="mx-2 text-lime-1">|</span>
                <span class="flex-1 text-ellipsis">{{item.title}}{{item.title}}</span>
                <span class="fs-sm text-black-7">{{item.date | date}}</span>
            </router-link >
        </template>

    </m-list-card>

    <m-list-card title="英雄列表" icon="card-hero" :categorise="heroData">
        <template #list="{list}">
            <div class="flex flex-wrap  hero-list" style="margin:0 -.3rem">
                <div v-for="(item,i) in list.heroList" :key="i" class="p-2 text-center" style="width:20%;">
                    <img class="w-100" :src="item.avatar" :alt="item.name">
                    <h3>{{item.name}}</h3>
                </div>
            </div>
        </template>

    </m-list-card>

      <m-list-card title="英雄列表" icon="card-hero" :categorise="heroData">
        <template #list="{list}">
            <div class="flex jc-between fs-lg ai-center mt-4" v-for="(item,i) in list.newsList" :key="i">
                <span class="text-lime-1">[{{item.categoryName}}]</span>
                <span class="mx-2 text-lime-1">|</span>
                <span class="flex-1 text-ellipsis">{{item.title}}</span>
                <span class="fs-sm text-black-7">{{item.date | date}}</span>
            </div>
        </template>

    </m-list-card>

   <m-list-card title="新闻资讯" icon="menu" :categorise="listData">
        <template #list="{list}">
            <div class="flex jc-between fs-lg ai-center mt-4" v-for="(item,i) in list.newsList" :key="i">
                <span class="text-lime-1">[{{item.categoryName}}]</span>
                <span class="mx-2 text-lime-1">|</span>
                <span class="flex-1 text-ellipsis">{{item.title}}{{item.title}}</span>
                <span class="fs-sm text-black-7">{{item.date | date}}</span>
            </div>
        </template>

    </m-list-card>
    

</div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    filters:{
        date(val){
            return dayjs(val).format("MM/DD")
        }
    },
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-home'
                }
                
            },
            homes:[],
            //  设计数据 listData 的思想，当一个分类中包含多个列表项时，使用 数组包裹多个对象的形式
            // listData: new Array(5).fill({
            //     name: '热门',
            //     newsList: new Array(5).fill({
            //         categoryName: "公告",
            //         title: '6月18日全服不停机修复公告',
            //         date: '06/13'
            //     })
            // })
            listData:[],
            heroData:[]
        }
    },
    methods:{
        async listDatafecth(){
            const res = await this.$http.get('/news/list')
            this.listData = res.data
            console.log(res.data)
        },
        async heroDatafecth(){
            const res = await this.$http.get('/heros/list')
            this.heroData = res.data
            
        }
    },
    created(){
        this.listDatafecth()
        this.heroDatafecth()
    },
    computed:{
        
    }
}
</script>


<style lang="scss">
@import "../assets/style/variable.scss";

.swiper-pagination {
    .swiper-pagination-bullet {
        opacity: 1;
        border-radius: 4px;
        width: 12px;
        height: 12px;
        background-color: map-get($colors, "white");

        &.swiper-pagination-bullet-active {
            background-color: map-get($colors, "info");
        }
    }
}

.snav {
    border-bottom: 1px solid $border-color;
    border-top: 1px solid $border-color;
    .snav-item{
        width: 25%;
        border-right: 1px solid $border-color;

        &:nth-child(4n) {
            border-right: none;
        }
    }
}


</style>
