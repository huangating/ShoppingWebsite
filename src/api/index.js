//当前的模块，API进行统一管理
import requests from "./request";
import mockRequests from './mockRequests'
//三级联动的接口
// /api/product/getBaseCategoryList
//获取商品分类的数据
export const reqCategoryList = () => {
    //   发请求:axios发送请求返回的是promise对象
    //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
    //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
    //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
    return requests({ url: '/product/getBaseCategoryList', method: "get" })
}
//获取首页轮播图数据的接口
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' })

//获取floor数据的接口
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' })


//搜索模块的请求接口函数:
//将来根据不同的搜索条件,需要给服务器携带不同的参数
//请求体携带搜索的参数
//搜索的条件:它应该是一个对象,可有可无，但是data至少是一个空对象
//第一步:整理搜索的参数
//第二步：根据最新的搜索参数，获取最新的数据展示!!
export const reqSearchList = (data) => requests({ url: `/list`, method: 'post', data })


//详情模块商品数据
export const reqDetailList = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

// 加入购物车|将来修改商品个数的接口
export const reqAddOrUpdateCart = (skuId, skuNum) => requests({ url: `cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取用户购物车的数据接口
export const reqShopCart = () => requests({ url: `/cart/cartList`, method: 'get' })

//删除某一个商品的接口
export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//修改某一个商品的勾选的状态
export const reqUpdateChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码接口
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

//注册的接口

export const reqRegister = (data) => requests({ url: `/user/passport/register`, method: 'post', data });

// 登录的接口
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, method: 'post', data })
//获取用户登录成功以后用户信息的接口
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' });

// 退出登录
export const reqUserLogout = () => requests({ url: `/user/passport/logout`, method: 'get' })

// 获取用户地址信息
export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });

//获取商品清单数据
export const reqShopInfo = () => requests({ url: `/order/auth/trade`, method: 'get' });

//提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });



//获取支付信息接口
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });


//查询支付结果
export const reqPayResult = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });


//获取我的订单
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });