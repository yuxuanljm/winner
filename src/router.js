import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewList from './components/New/NewList.vue'
import NewInfo from './components/New/NewInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goodslist/GoodsList.vue'
import GoodsInfo from './components/goodslist/GoodsInfo.vue'
import GoodsDesc from './components/goodslist/GoodsDesc.vue'
import GoodsComment from './components/goodslist/GoodsComment.vue'
// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/member',component:MemberContainer},
    {path:'/shopcar',component:ShopcarContainer},
    {path:'/search',component:SearchContainer},
    {path:'/home/newList',component:NewList},
    {path:'/home/newInfo/:id',component:NewInfo},
    {path:'/home/photolist',component:PhotoList},
    {path:'/home/photoinfo/:id',component:PhotoInfo},
    {path:'/home/goodslist',component:GoodsList},
    {path:'/home/goodsinfo/:id',component:GoodsInfo},
    {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'GoodsDesc'},
    {path:'/home/goodscomment/:id',component:GoodsComment,name:'GoodsComment'}

  ],
  linkActiveClass:'mui-active'  //去掉'首页'的mui-active，因为中有点击首页才有高亮
  //使用linkActiveClass 可以覆盖所有路由高亮显示的类
})

// 把路由对象暴露出去
export default router