<template>
<el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router unique-opened :default-active="$route.path" collapse-transition>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>内容管理</template>
                <el-menu-item-group>
                    <template slot="title">分类</template>
                    <el-menu-item index="/categories/create">新建分类</el-menu-item>
                    <el-menu-item index="/categories/list">分类列表</el-menu-item>
                </el-menu-item-group>
                <!-- 物品分类管理 -->
                <el-menu-item-group>
                    <template slot="title">物品</template>
                    <el-menu-item index="/items/create">新建物品</el-menu-item>
                    <el-menu-item index="/items/list">物品列表</el-menu-item>
                </el-menu-item-group>

            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-document"></i>运营管理</template>
                <el-menu-item-group>
                    <template slot="title">广告位</template>
                    <el-menu-item index="/ads/create">新建广告位</el-menu-item>
                    <el-menu-item index="/ads/list">广告位列表</el-menu-item>
                </el-menu-item-group>
                <!-- 英雄分类管理 -->
                <el-menu-item-group>
                    <template slot="title">英雄</template>
                    <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
                    <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">文章</template>
                    <el-menu-item index="/articles/create">新建文章</el-menu-item>
                    <el-menu-item index="/articles/list">文章列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-document"></i>系统设置</template>
                <el-menu-item-group>
                    <template slot="title">管理员</template>
                    <el-menu-item index="/admin_user/create">新建管理员</el-menu-item>
                    <el-menu-item index="/admin_user/list">管理员列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>

    <el-container>
        <el-header style="">
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
            <el-button style="float:right;margin:.6rem 0 0 .6rem" type="success" @click="$router.push('/login')">登录</el-button>
            <el-button style="float:right;margin-top:.6rem" type="danger" @click="clearLocalStorage">清除本地缓存</el-button>
        </el-header>

        <el-main>
            <!-- 这里根据 路由来判断组件，即可解决编辑页跳转新建页的bug -->
            <router-view :key="$route.path" v-if="isTrue"></router-view>
            <!-- :key="$route.path" -->
        </el-main>
    </el-container>
</el-container>
</template>

<style>
.el-header {
    line-height: 60px;
    font-size: 16px;
    background-color: #409EFF;
    color: #fff;
}

.el-aside {
    color: #333;
}
</style>

<script>
export default {
    data() {
        return {
            isTrue: true
        }
    },
    provide() {
        return {
            reload: this.clearLocalStorage
        }
    },
    methods: {
        clearLocalStorage() {
            this.isTrue = false
            localStorage.clear()
            this.$nextTick(function () {
                this.isTrue = true
            })

        }
    }
};
</script>
