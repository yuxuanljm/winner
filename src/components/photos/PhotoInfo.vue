<template>
    <div  class="photoinfo-container">
        <!-- 标题 -->
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time | dataFormat}}</span>
            <span>点击:{{photoinfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->

        <div class="thumbs">
         <img class="preview-img" v-for="(item, index) in list"
          :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
        </div>
    
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"> </div>
        <!-- 放置一个评论子组件 -->
           <cmt-box :id="id"></cmt-box>
    </div>
</template>
<script>
import comment from '../subcomment/comment.vue'
export default {
    data(){
        return{
            //从路由中获取到的id 下次使用this.id
            id:this.$route.params.id,
            photoinfo:{},
            list:[] // 缩略图
        }
    },
    created(){
        this.getDetails();
        this.getThumbs()
    },
    methods:{
        getDetails(){
            this.$http.get('api/getimageInfo/' + this.id ).then(result=>{
                if(result.body.status === 0){
                    this.photoinfo = result.body.message[0]
                }else{
                    console.log('error')
                }
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/' + this.id ).then(result=>{
                if(result.body.status === 0){
                    //循环每个图片的数据，设置宽高
                     result.body.message.forEach(item =>{
                         item.w = 600;
                         item.h = 400;
                     })
                     this.list =  result.body.message 
                }else{
                    console.log('error')
                }
            })
        }
    },
    components:{
        "cmt-box":comment
    }
}
</script>
<style lang="scss" scoped>
.photoinfo-container{
    padding:4px;
    h3{
        color:#26A2FF;
        font-size:15px;
        text-align: center;
        margin:15px 0
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px
    }
}
.thumbs{
    img{
        margin:5px;
        box-shadow: 0 0 10px #999
    }
}
</style>
