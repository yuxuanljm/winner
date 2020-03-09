<template>
   <div class="goodsdesc-box">
       <h3 class="title">{{goodsdesc.title}}</h3>
       <hr>
       <div class="goodsdesc-container" v-html="goodsdesc.content">
       </div>
   </div>
</template>

<script>
export default {
    data(){
        return {
            goodsdesc:{}
        }
    },
    created(){
        this.getgoodsdesc();
    },
    methods:{
        getgoodsdesc(){
            this.$http.get('api/goods/getdesc/'+  this.$route.params.id).then(result=>{
                if(result.body.status === 0){
                    this.goodsdesc = result.body.message[0];
                }
            })
        }
    }
}
</script>

<style lang="scss">
// 图片100%  去掉scoped 
.goodsdesc-box{
    padding:5px;
    .title{
        text-align: center;
        margin:15px 0;
        color:#226aff;
        font-size: 16px;
    }
    .goodsdesc-container{
        img{
            width:100%;
        }
    }
}
</style>

