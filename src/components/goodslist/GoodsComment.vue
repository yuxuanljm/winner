<template>
   <div>
       <goodscomment :id="$route.params.id"></goodscomment>
   </div>
</template>

<script>
import goodscomment from '../subcomment/comment.vue'
export default {
    components:{
        goodscomment
    }
}
</script>

<style>

</style>
