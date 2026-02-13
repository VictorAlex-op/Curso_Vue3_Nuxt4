<script setup>
import NavBar from './components/NavBar.vue'
import { useUserStore } from './stores/userStore'; 
const user = useUserStore()

</script>

<template>

  <!-- navegacion -->
  <div v-if="user.userData !== null">
    <NavBar></NavBar>
  </div>

  <!-- redireccion por router -->
  <a-layout-content style="padding: 0 50px">
    <div :style="{background: '#fff',padding:'24px',minHeight:'280px'}">
      <router-view></router-view>
    </div>
  </a-layout-content>

</template>

<style>

</style>
