<template>
   <div class="shopcar-container">
       <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
		  <div class="mui-card-content">
			<div class="mui-card-content-inner">

                <mt-switch 
                v-model="$store.getters.getGoodsSelected[item.id]"
                @change="selectedChanged(item.id, 
                $store.getters.getGoodsSelected[item.id])">
                </mt-switch>
                <img :src="item.thumb_path" alt="">
                <div class="top">
                    <h3>{{item.title}}</h3>
                    <div class="top_top">
                        <p class="price">￥{{item.sell_price}}</p>
                        <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                        <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 结算区域 -->
    <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner jiesuan">
                <div class="left">
                    <p>总计(不含运费)</p>
                    <p>已勾选商品 <span>{{$store.getters.getGoodsCountAndAmount.count}}</span> 件,
                    总价<span>￥{{$store.getters.getGoodsCountAndAmount.amount}}</span> 元</p>
                </div>
                <mt-button type="danger">去结算</mt-button>
            </div>
        </div>
    </div>
    <p>{{$store.getters.getGoodsSelected}}</p>
   </div>
</template>

<script>
import numbox from '../subcomment/shopcar_numbox.vue'
// import { connect } from 'tls';
// import { ConcatSource } from 'webpack-sources';
export default {
    data(){
        return {
            goodslist:[]
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            var idList = []
            this.$store.state.car.forEach(item=>idList.push(item.id))
            if(idList.length<=0){
                return
            }
            this.$http.get('api/goods/getshopcarlist/'+idList.join(','))
            .then(result=>{
                if(result.body.status === 0){
                    this.goodslist = result.body.message
                }
            })
        },
        remove(id,index){
            // id删除商品，index删除goodslist
            this.goodslist.splice(index,1);
            this.$store.commit('removeFromCar',id);
        },
        selectedChanged(id,val){
            console.log(id + "----" + val)
            this.$store.commit('modefiyGoodsSelected',{id,selected:val})
        }
    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container{

    .mui-card-content-inner{
        display: flex;
        align-items: center;
        .top{
           .top_top{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
           }
        }
        h3{
            font-size: 14px;
        }
        img{
            width:60px;
            height: 60px;
        }
        .price{
            color: red
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            color:red;
            font-size: 15px
        }
    }
}
</style>

