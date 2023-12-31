import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"
const state ={
    cartList:[]
}

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}

const actions = {
    //获取购物车列表数据
   async getCartList({ commit }){
    let result = await reqCartList()
    if(result.code == 200){
        commit('GETCARTLIST',result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartByIdSkuId({ commit },skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))    
        }
    },
    //修改勾选状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))    
        }
    },
    //删除所有选中的商品
    deleteAllCheckedCart({dispatch,getters}){
        //context:小仓库  commit【提交mutation】,mutations,getters,state,dispatch【派发action】
        // console.log(context)
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1? dispatch('deleteCartByIdSkuId',item.skuId):''
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked}) 
            promiseAll.push(promise)           
        })
        return Promise.all(promiseAll)
    }
}

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
   
}

export default {
    state,
    mutations,
    actions,
    getters
}
