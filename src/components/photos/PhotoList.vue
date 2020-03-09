<template>
  <div>
    <!-- 头部 -->
    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
            <a :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getimages(item.id)">
               {{item.title}}
            </a>
        </div>
    </div>
  </div> 
   <!-- 图片列表 -->
    <ul class="photo-list">
        <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
            <img v-lazy="item.img_url" >
            <div class="info">
                <h1 class="info-title">{{item.title}}</h1>
                <div class="info-body">{{item.zhaiyao}}</div>
            </div>
        </router-link>
    </ul>
   
</div>  

</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            cates:[],
            list:[]
        };
    },
    created(){
        this.getphoto();
        //默认进入页面请求
        this.getimages(0)
    },
    mounted(){
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },
    methods:{
        getphoto(){
            this.$http.get('api/getimgcategory').then(result=>{
                if(result.body.status === 0){
                    result.body.message.unshift({ title:'全部', id:0 });
                    this.cates = result.body.message;  
                }else{
                    Toast('图片获取失败！')
                }
            })
        },
        getimages(cateId){
            this.$http.get('api/getimages/'+ cateId).then(result=>{
                if(result.body.status === 0){
                    this.list = result.body.message
                }else{
                    Toast('图片获取失败！！')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list{
    padding:10px;
    margin:0;
    padding:10px;
    padding-bottom:0;
    list-style: none;
    li{
        position: relative;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 10px #999;
        background-color: #ccc;
        vertical-align: middle;
    img{
        width:100%;
    }
   img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info{
        color: white;
        position: absolute;
        bottom: 0;
        text-align: left;
        background-color: rgba(0,0,0,0.4);
        max-height: 84px;
        .info-title{
            font-size: 14px;
        }
        .info-body{
            font-size: 13px
        }
      }
    }
}
   
</style>
