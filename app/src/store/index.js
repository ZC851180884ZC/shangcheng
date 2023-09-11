import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// //state:仓库存储数据的地方
// const state ={}
// //mutation：修改state的唯一手段
// const mutations = {}
// //action：处理action，可以书写自己的业务逻辑，也可以处理异步
// const action = {}
// //getters：理解计算属性，用于简化仓储数据，让组件获取数据更方便
// const getters = {}



//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})
