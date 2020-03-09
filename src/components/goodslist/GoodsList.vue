<template>
   <div class="content-list">
       <!-- 使用window.location.href 实现跳转 编程式导航 -->
       <div class="goods" v-for="item in shoplist" :key="item.id" @click="getDetail(item.id)">
           <img :src="item.img_url" alt="">
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <div class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="odd">￥{{item.market_price}}</span>
                 </div>
                <div class="boot">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
            </div>
       </div>
    <mt-button type="danger" size="large"  v-cloak class="button" @click="getMore">加载更多</mt-button>
</div>
</template>
<script>
export default {
    data(){
        return {
            pageindex:1,
            shoplist:[]
        }
    },
    created(){
        this.getshoplist();
    },
    methods:{
        getshoplist(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex)
            .then(result=>{
                if(result.body.status === 0){
                    // this.shoplist = result.body.message;
                this.shoplist = this.shoplist.concat(result.body.message);
                }
            })
        },
        getMore(){
            //注意: pageindex 一定要用this调用，否则找不到
            this.pageindex++;
            this.getshoplist()
        },
        getDetail(id){
            // vue-router
            this.$router.push({path:"/home/goodsinfo/" + id}) 
        }
    }
}
</script>
<style lang="scss" scoped>
.content-list{
    [v-cloak]{
    display: none;
    }
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding:7px;
   // position: relative;
    .goods{
        width: 49%;
        box-shadow: 0 0 10px #ccc;
        border:1px solid #ccc;
        min-height:293px;
        margin:5px 0; 
        padding:3px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .info{
            background-color: #ccc;
            p {
                margin: 0;
                padding: 5px;
            }
        }
        img{
            width: 100%;
        }
        .title{
            font-size: 13px
        }
        .price{
            .now{
                font-size: 14px;
                font-weight: bold;
                color: red;
            }
            .odd{
                text-decoration: line-through;
                font-size: 12px;
                margin-left:15px;
            }
        }
        .boot{
             display: flex;
             justify-content: space-between;
             font-size: 13px;
            //  padding:3px;
        }
    }
    .button{
        // z-index: 35;
        margin-bottom: 50px;
    }
}
</style>

