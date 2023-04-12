// 配置路由
// 引入路由组件
// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import paySuccess from '@/pages/paySuccess'
import Center from '@/pages/Center'

// 引入个人中心的二级路由子组件
import MyOrder from '@/pages/Center/myOrder'
import TeamOrder from '@/pages/Center/teamOrder'

export default [
    {
        path: '/home',
        // 这里是路由懒加载的语法
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: "search"
    },
    //重定向，在项目跑起来的时候，访问/，立马让它定向到首页
    {
        path: '*',
        redirect: "/home"
    },

    {
        path: '/detail/:skuId?',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true }
    },
    {
        path: '/paysuccess',
        component: paySuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        // 二级路由配置的地方
        children: [
            //我的订单
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'teamorder',
                component: TeamOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'

            }
        ]
    }
]
