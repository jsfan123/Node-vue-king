<template>
    <div class="card mt-3 bg-white p-3">
        <div class="card-header flex ai-center pb-3">
            <!-- 通过 props 传递参数 来设置不同的图标 -->
            <i class="iconfont fs-lg" :class="`icon-${icon}`"></i>
            <div class="fs-cg flex-1 ml-2">{{title}}</div>
            <i class="iconfont icon-sangedian fs-lg"></i>
        </div>
        <div class="card-body pt-3">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
      title:{
          type:String,
          required:true
      },
      icon:{
          type:String,
          required:true
      }   
    }
}
</script>

<style lang="scss">
@import '../assets/style/variable';
.card{
    border-bottom: 1px solid $border-color;
    .card-body{
        border-top: 1px solid $border-color;
    }
}

</style>

