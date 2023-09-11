import axios  from "axios";
import nprogress  from "nprogress";
import 'nprogress/nprogress.css'
const requests = axios.create({
    baseURL:'/mock',
    timeout:5000
});
//请求拦截器
requests.interceptors.request.use((config)=>{
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