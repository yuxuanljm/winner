// 入口文件
import Vue from 'vue'
//1.1导入路由模块
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//导入vuex
import Vuex from 'vuex'
//注册vuex
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state:{
        // this.$store.state.***
        // {id:1,count:购买的数量,price：商品单价,selected:true}
        car:car
    },
    mutations:{
        // this.$store.commit('方法名称',要传递的参数);
        // 只能传递2个参数，第二个参数可以是对象也可以是数组 
      
        addToCar(state,goodsinfo){
            var  flag = false
            //加入购物车中原先存在商品  则需要拼接数量
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            if(!flag){
                state.car.push(goodsinfo)
            }
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        modefiyGoodsInfo(state,goodsinfo){
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            }),
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            //从store中删除数据
            state.car.some((item,i)=>{
                if(item.id == id){
                    state.car.splice(i,1)
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        modefiyGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id = info.id){
                     item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters:{
        // this.$store.getters.***
        getAllCount(state){
            var c = 0
            state.car.forEach(item=>{
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,
                amount:0
            }
            state.car.forEach(item=>{
                if(item.selected){
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }

    }
})

//1.3导入router.js路由模块
import router from './router.js'
//时间格式化的插件
import moment from 'moment'
Vue.filter('dataFormat',function(dataStr,pattern = 'YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern)
})

//2.1导入vue resource
import VueResource from 'vue-resource'
//2.2安装
Vue.use(VueResource)
//全局配置根路径 
//注意：一定要在vueRource之后配置
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//post请求的第三个参数
Vue.http.options.emulateJSON = true;
//导入MUi样式
import './lib/mui/css/mui.min.css'

import './lib/mui/css/icons-extra.css'

//按需导入mint-ui中的组件
// import {Header,Swipe, SwipeItem ,Button} from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// //图片懒加载
// import { Lazyload } from 'mint-ui';
// Vue.use(Lazyload);
//按需导入实现不了懒加载
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'
//缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//导入app组件
import app from './App.vue'

var vm =  new Vue({
    el:'#app',
    render:c => c(app),
    router, //1.4挂载路由
    store  
})