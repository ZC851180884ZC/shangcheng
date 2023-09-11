<template>
  <div id="app">
    <Header></Header>
    <!-- 路由 -->
    
    <router-view></router-view>

    <!-- <Footer v-show="$route.path=='/home' || $route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>

import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  mounted(){
    //派发action
    this.$store.dispatch("categoryList")
  },
}
</script>



<style>

</style>
