import Vue from 'vue'
import App from './App.vue'
// 三级联动组件-全局组件
import TypeNav from '@/components/TypeNav'
//引入分页器全局组件
import Pagination from "@/components/Pagination"
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

// 按需引入elementui
import { Button, Row, Col, MessageBox, Message, Input } from 'element-ui'
// 大多数组件注册为全局组件
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
// 按需引入法的写法也是有不同的地方的，注意查看文档进行开发
Vue.prototype.$msgbox = MessageBox
// 消息提示框
Vue.prototype.$alert = MessageBox.alert;

Vue.prototype.$message = Message;

// 引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
// 引入模拟接口
import "@/mock/mockServe.js"
Vue.config.productionTip = false
//将项目全部请求函数引入分别暴露
import * as http from '@/api'
//测试
// import { reqCategoryList } from "@/api"
// reqCategoryList()

import loading from '@/assets/111.png'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'

// 注册插件
Vue.use(VueLazyload, {
  //懒加载的默认图片
  loading: loading
})

new Vue({
  //配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$http = http
  },
  render: h => h(App),
  // 注册路由这里kv一致省略v
  router,
  //注册仓库，组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
