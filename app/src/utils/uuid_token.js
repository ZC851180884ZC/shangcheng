import {v4 as uuidv4} from 'uuid'

export const getUUID = ()=>{
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有
    if(!uuid_token){
        //生成临时身份
        uuid_token = uuidv4()
        //在本地存储
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    //切记有返回值，没有是undefined
    return uuid_token
}   