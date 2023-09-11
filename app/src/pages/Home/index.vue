<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    
    <Brand></Brand>
  </div>
  
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState } from 'vuex';
export default {
    name: "",
    components: {
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    //floor组件的数据
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList   
        })
    },
    mounted(){
        //floor组件数据
        this.$store.dispatch('getFloorList');
        //获取用户信息在首页展示
        // this.$store.dispatch('getUserInfo')
    },
  
}
</script>

<style>

</style>