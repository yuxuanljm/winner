import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewList from './components/New/NewList.vue'
import NewInfo from './components/New/NewInfo.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/member',component:MemberContainer},
    {path:'/shopcar',component:ShopcarContainer},
    {path:'/search',component:SearchContainer},
    {path:'/home/newList',component:NewList},
    {path:'/home/newInfo/:id',component:NewInfo}
  ],
  linkActiveClass:'mui-active'  //去掉'首页'的mui-active，因为中有点击首页才有高亮
  //使用linkActiveClass 可以覆盖所有路由高亮显示的类
})

// 把路由对象暴露出去
export default router