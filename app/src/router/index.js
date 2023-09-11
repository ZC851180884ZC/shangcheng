import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
//引入store
import store from '@/store'


// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'



//先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.push

//重写push|replace
//第一个参数：告诉原来的push方法，往哪跳转
//第二个参数：成功的回调
//第三个参数：失败的回调
VueRouter.prototype.push = function (location,resolve,reject){
    if (resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else {
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function (location,resolve,reject){
    if (resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else {
        originReplace.call(this,location,()=>{},()=>{})
    }
}

 let router = new VueRouter({
    //routes  不是routers
    routes:[
        {
            path:'/home',
            component:()=>import('@/pages/Home'),
            meta:{show:true}
        },
        {
            name:'search',
            path:'/search/:keyword?',
            component:Search,
            meta:{show:true}
        },
        {
            path:'/login',
            component:Login,
            meta:{show:false}
        },
        {
            path:'/register',
            component:Register
        },
        {
            path:'/detail/:skuid?',
            component:Detail,
            meta:{show:true}
        },
        {
            path:'/addcartsuccess',
            name:'addcartsuccess',
            component:AddCartSuccess,
            meta:{show:true}
        },
        {
            path:'/shopcart',
            name:'ShopCart',
            component:ShopCart,
            meta:{show:true}
        },
        {
            path:'/trade',
            name:'Trade',
            component:Trade,
            meta:{show:true},
            beforeEnter:(to,from,next) => {
                if(from.path=='/shopcart'){
                    next()
                }else {
                    next(false)
                }
            }
        },
        {
            path:'/pay',
            name:'Pay',
            component:Pay,
            meta:{show:true},
            beforeEnter:(to,from,next) => {
                if(from.path=='/trade'){
                    next()
                }else {
                    next(false)
                }
            }
        },
        {
            path:'/paysuccess',
            name:'PaySuccess',
            component:PaySuccess,
            meta:{show:true}
        },
        {
            path:'/center',
            component:Center,
            meta:{show:true},
            children:[
                {
                    path:'myOrder',
                    component:MyOrder,
                     
                },
                {
                    path:'groupOrder',
                    component:GroupOrder,
                    
                },
                //重新定向
                {
                    path:'/center',
                    redirect:"/center/myOrder",
                   
                },
            ]
        },


        //重新定向，在项目跑起来的时候，访问/立马定向到首页
        {
            path:'*',
            redirect:"/home",
            meta:{show:false}
        },


    ],
    scrollBehavior(to,from,savedPosition){
        return {y : 0}
    }
    
})

//全局守卫：前置守卫（在路由间跳转判断）
router.beforeEach(async(to,from,next)=>{
//to:跳转到哪个路由
//from:从哪个路由跳转过来的
//next:放行函数
// next();
let token = store.state.user.token
let name = store.state.user.userinfo.name
    if(token){
        //登录了，去login不跳转
        if(to.path=='/login'||to.path=='./register'){
            next('/home')
        }else {
            //登录了,去的不是login【home|search...】
            //如果是用user，user是数组，即便是空数组也返回的是true,所以拿里面的属性
            if(name){
                next()
            }else{
                //没有用户信息，派发action让仓库存储用户信息在跳转
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else {
        //未登录：不能去交易相关，支付相关
        //未登录去上面的这些路由，跳转登录
        let toPath = to.path
        if(toPath=='/trade' || toPath.indexOf('/pay')!= -1 || toPath.indexOf('/center')!=-1){
            //redirect不是固定 red der     query参数
            next('/login?redirect='+toPath)
        }else{
            //取得不是上面的这些路由放行
            next()
        }
        
    }

})



export default router