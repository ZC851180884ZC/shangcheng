import Vue from 'vue'
import App from './App.vue'

//三级联动组件---全局组件
import TypeNav from '@/components/Typenav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button,MessageBox } from 'element-ui'


//第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//全局注册
Vue.component(Button.name,Button)
//挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'

//引入mockServe.js
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//引入插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:tp
})

import '@/plugins/validate'

// import {reqGetSearchInfo} from '@/api'
// console.log(reqGetSearchInfo());
//统一接口api文件夹里面全部的请求函数
import * as API from '@/api'
//引个图片
import tp from '@/assets/logo.png'

Vue.config.productionTip = false

new Vue({ 
  render: h => h(App),
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  //注册仓库
  store,
}).$mount('#app')
