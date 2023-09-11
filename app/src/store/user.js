import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api"
import {setToken,getToken,removeToken} from '@/utils/token'

const state ={
    code:'',
    token:getToken(),
    userinfo:{}
}

const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    USERINFO(state,userinfo){
        state.userinfo = userinfo
    },
    CLEAR(state){
        state.token='',
        state.userinfo={},
        removeToken()
    }
}

const actions = {
    //验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code==200){
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    //登录业务
    async userLogin({commit},data){
       let result = await reqUserLogin(data)
       if(result.code==200){
        commit('USERLOGIN',result.data.token)
        // localStorage.setItem('TOKEN',result.data.token)
        setToken(result.data.token)
        return 'ok'
       }else {
        return Promise.reject(new Error('faile'))
       }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code == 200){
            commit('USERINFO',result.data)           
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }

    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code==200){
            commit('CLEAR',result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}

