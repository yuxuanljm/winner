<template>
    <div>
            <!-- 轮播图区域 -->
            <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
            <mt-swipe-item v-for="item in lunbotu" :key="item.url">
                <img :src="item.img" alt="">
                <!-- <mt-swipe-item>1</mt-swipe-item>
                <mt-swipe-item>2</mt-swipe-item>
                <mt-swipe-item>3</mt-swipe-item> -->
            </mt-swipe-item>
            </mt-swipe>
        </div>
</template>
<script>
export default {
    props:["lunbotu"]
}
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;

    img {
      //width: 100%;
      height: 100%;
    }
  }
}
</style>
