//API进行统一管理


import requests  from "./ajax";

import mockRequests from './mockAjax'
//三级联动接口
//gmall-h5-api.atguigu.cn get  无参数
//gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList

//发请求:axios发请求返回结果是promise对象
export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList' ,method:'get'})

export const reqGetBannerList = ()=> mockRequests.get('/banner' )
export const reqFloorList = ()=> mockRequests.get('/floor' )

//获取搜索模块的数据 地址：/api/list 请求方式：post 需要带参数
/* 
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
export  const reqGetSearchInfo = (params)=> requests({url:"/list",method:"post",data:params})
//获取产品详情信息的接口
export  const reqGoodInfo =(skuId) => requests({url:`/item/${skuId}`,method:'get'})

//产品添加到购物车中（获得更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表接口
export const reqCartList = () => requests({url:'cart/cartList',method:'get'})

//删除购物车产品接口
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//切换商品选中状态/api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码/api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册信息提交/api/user/passport/register   post   phone,code,password
export const reqUserRegister = (data) => requests ({url:'/user/passport/register',method:'post',data})

//登录信息/api/user/passport/login   post
export const reqUserLogin = (data) => requests({url:'/user/passport/login',method:'post',data})

//获取用户信息【需要带着用户的token向服务器要信息】
//url:/api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录  url:/api/user/passport/logout  get
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList    get
export const reqAddressInfo = ()=> requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取商品清单 /api/order/auth/trade
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})

//提交订单    /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//订单支付信息 /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:"get"})

//查询支付订单状态   /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取我的订单列表 /api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})