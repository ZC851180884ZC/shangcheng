import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'
//home仓库
const state ={
    categoryList:[],
    bannerList:[],
    floorList:[]
}

const mutations = {
    GATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    },
}
   
const actions = {
   async categoryList({commit}){
       let result = await reqCategoryList()
       if(result.code == 200){
        commit('GATEGORYLIST',result.data)
       }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit('GETBANNERLIST',result.data)
           }
    },
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code == 200){
            commit('GETFLOORLIST',result.data)
           }
    },
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}