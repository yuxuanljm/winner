// 入口文件
import Vue from 'vue'
//1.1导入路由模块
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
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
//导入MUi样式
import './lib/mui/css/mui.min.css'

import './lib/mui/css/icons-extra.css'

//按需导入mint-ui中的组件
import {Header,Swipe, SwipeItem ,Button} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);



//导入app组件
import app from './App.vue'

var vm =  new Vue({
    el:'#app',
    render:c => c(app),
    router  //1.4挂载路由
})