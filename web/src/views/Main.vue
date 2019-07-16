<template>
    <div>
      <div class="header flex bg-black p-2 px-4 ai-center">
        <img src="../assets/logo.png" height="30" alt="">
        <div class=" ml-3 flex-1">
          <div class="text-white">王者荣耀</div>
          <div class=" fs-xxs text-black-1 mt-1">团队成就更多</div>
        </div>
        <button type="button" class="fs-sm btn bg-primary p-2 py-1">立即下载</button>
      </div>
      <div class="bg-primary p-3">
        <div class="nav jc-around text-white fs-lg">
          <div class="nav-item nav-inverse">
            <router-link tag="div" to='/' class="nav-link">首页</router-link>
          </div>
          <div class="nav-item">
            <router-link tag="div" to='/about' class="nav-link">攻略中心</router-link>
          </div>
          <div class="nav-item">
            <router-link tag="div" to='/about' class="nav-link">赛事中心</router-link>
          </div>
         
        </div>
      </div>
      <router-view></router-view>
    </div>
</template>
    
<script>
    export default {}
</script>

<style lang="scss">
    .header{
      position: sticky;
      top: 0;
      z-index: 1000;
    }
</style>