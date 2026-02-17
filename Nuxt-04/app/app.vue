<script setup lang="ts">
import AppNavbar from './components/app-navbar.vue';

</script>


<template>

  <AppNavbar></AppNavbar>
  <div class="container">
    <NuxtLayout>
      <NuxtPage/>  <!-- Para en rutar atravez de nuestra carpeta pages -->
    </NuxtLayout>
  </div>
</template>
