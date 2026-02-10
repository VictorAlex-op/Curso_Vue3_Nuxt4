<script setup>
import {useUserStore} from './stores/userStore'
const userStore = useUserStore()

</script>

<template>

  <!-- navegacion -->
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <button @click="userStore.Logout">logout</button>
    </nav>
  </div>

  <!-- redireccion por router -->
  <router-view></router-view>

</template>

<style>

</style>
