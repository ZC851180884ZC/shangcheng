import axios  from "axios";
//引入仓库
import store from '@/store' 
import nprogress  from "nprogress";
import 'nprogress/nprogress.css'
const requests = axios.create({
    baseURL:'/api',
    timeout:5000
});
//请求拦截器
requests.interceptors.request.use((config)=>{
    //uuid的假id
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //需要携带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    nprogress.start()
    return config
})
//相应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数
    nprogress.done()
    return res.data
},(error)=>{
    //失败的回调函数
    return Promise.reject(new Error('faile'))
})



export default requests