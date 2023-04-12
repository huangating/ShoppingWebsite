<template>
<div>
<Header></Header>
<!-- 路由组件出口的地方 -->
<router-view></router-view>
<Footer v-show="$route.meta.show"></Footer>
</div>

</template>

<script>

import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'App',
  components:{
    Header,Footer
  },
  mounted(){
      //派发action 获取商品分类的三级别表数据
      this.$store.dispatch("getCategory")
  }
}
</script>

<style>

</style>
