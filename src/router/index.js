import Vue from 'vue';
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter)

import routes from './routes'

//引入仓库
import store from '@/store'
//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
// console.log(originPush);
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

// 暴露vuerouter类的实例
//对外暴露一个路由器，实质是vuerouter类的实例，一个路由可以管理多个路由
const router = new VueRouter({
    //配置路由
    routes,
    //设置滚动条的位置
    scrollBehavior() {
        // 滚动行为这个函数，需要有返回值，返回值为一个对象
        // 经常可以设置滚动条x|y位置，最小为0
        return { y: 0 }
    }
});
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 用户是否跳转，取决于仓库里面是否有token
    // 每一次路由跳转之前都需要有用户信息在跳转，没有就发请求获取用户信息在跳转
    let hasToken = store.state.user.token;
    // 用户信息
    let hasNickName = store.state.user.nickName;
    // 用户登录
    if (hasToken) {
        // 用户登录，不能去login
        if (to.path == '/login') {
            next('/home')
        } else {
            //用户登录了。而且还有用户信息
            if (hasNickName) {
                next()
            } else {
                //用户登录了。但是没有用户信息
                try {
                    // 发请求获取用户信息以后再放行
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token过期、失效，用户没有信息携带token发请求获取信息失败
                    await store.dispatch('logout')
                    next('/login')
                }
            }
        }
    } else {
        //当用户没有登陆的时候不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})

export default router;
