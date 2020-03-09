<template>
     <div class="goodsinfo-container">
        <!-- 添加到购物车的小球动画 -->
        <transition 
        @before-enter="beforeEnter"
        @enter="Enter"
        @after-enter="afterEnter">
             <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
         <!-- 轮播图 -->
         <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotu="lunbotu"></swiper>
					</div>
				</div>
		</div>
        <!-- 中间 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        <span class="market_price">市场价:<del>￥{{goodsinfo.market_price}}</del></span>
                        <span class="sell_price">销售价:￥{{goodsinfo.sell_price}}</span>
                    </div>
                    <div class="number">
                        <!-- 此时刷新页面才可以点击 -->
                        购买数量:
                    <numbox @getcount="getSelectedCount"></numbox>
                    </div>
                    <mt-button type="primary" size="small" 
                    >立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="addtoShopCar()"
                    >加入购物车</mt-button>
                </div>
            </div>
		</div>
        <!-- 底部 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号  :  {{goodsinfo.id}}</p>
                        <p>库存情况  :  {{goodsinfo.stock_quantity}}件</p>
                        <p>上架时间  :  {{goodsinfo.add_time}}</p>                       
					</div>
				</div>
				<div class="mui-card-footer">
                     <mt-button type="primary" 
                     size="large" plain @click="getDesc(id)">图文介绍</mt-button>
                     <mt-button type="danger"
                      size="large" plain @click="getComment(id)">商品评论</mt-button>
                </div>
			</div>
     </div>
</template>
<script>
import swiper from '../subcomment/lunbotu.vue'
import numbox from '../subcomment/goodsinfo_numbox.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,
            lunbotu:[],
            goodsinfo:{},
            ballFlag:false,
            selectedCount:1 //默认选中的商品数量
        }
    },
    created(){
        this.getLunbotu();
        this.getgoodsinfo();
    },
    methods:{
        getLunbotu(){
            this.$http.get('api/getthumimages/' + this.id).then(result=>{
                if(result.body.status === 0){
                    // this.lunbotu = result.body.message
                    result.body.message.forEach(item=>{
                        item.img = item.src
                    })
                     this.lunbotu = result.body.message;
                }
            })
        },
        getgoodsinfo(){
            this.$http.get("api/goods/getinfo/" + this.id).then(result => {
                if (result.body.status === 0) {
                this.goodsinfo = result.body.message[0];
                }
            });
        },
        getDesc(id){
            this.$router.push({name:'GoodsDesc',params:{id}})
        },
        getComment(id){
             this.$router.push({name:'GoodsComment',params:{id}})
        },
        addtoShopCar(){
            this.ballFlag = !this.ballFlag
            //{id:1,count:购买的数量,price：商品单价,selected:true}
            const goodsinfo = {
               id:this.id,
               count:this.selectedCount,
               price:this.goodsinfo.sell_price,
               selected:true
           }
           this.$store.commit('addToCar',goodsinfo);
        },
        beforeEnter(el){
            el.style.transform = 'translate(0,0)'
        },
        Enter(el,done){
            el.offsetWidth

            //如何自动获取徽标的宽高以及小球的位置，能在不同分辨率下实现
            //如果用 scoll 和 offset如何实现
           const ballPosition = this.$refs.ball.getBoundingClientRect();
           const bagdePosition = document.getElementById('badge').
           getBoundingClientRect();

           const xDist = bagdePosition.left - ballPosition.left;
           const yDist = bagdePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px,${yDist}px)`
            el.style.transition = 'all .5s cubic-bezier(.4,-0.3,1,.68)'
            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count){
            this.getSelectedCount = count
            console.log(this.getSelectedCount)
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
.mui-card-content-inner{
   .number{
       margin:10px 0;
   }
   p{
       margin:8px;
   }
    .sell_price{
        color: red;
        font-weight: 800;
        margin-left: 10px;
    }
}
.mui-card-footer{
    display: block;
    padding:10px;
    button{
        margin:10px 0
    }
}
.ball{
    background-color: red;
    width:15px;
    height:15px;
    border-radius: 50%;
    position:absolute;
    z-index: 999;
    top:47%;
    left:34%
    // top: 777px;
    // left:260px;
  
}
</style>
