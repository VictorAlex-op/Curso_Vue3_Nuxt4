<script setup>
import { ref } from "vue";
import { RouterLink,RouterView } from "vue-router";

</script>

<template>
  
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../src/assets/calcifer.jpg" alt="Bootstrap" width="30" height="24">
        Router Vue
      </a>
      <div class="d-flex align-items-center justify-content-center">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <RouterLink to="/" class="nav-item link-underline link-underline-opacity-0">
            <h3 class="nav-link active">Home</h3>
          </RouterLink>
          <RouterLink to="/about" class="nav-item link-underline link-underline-opacity-0">
            <h3 class="nav-link active">About</h3>
          </RouterLink>
          <RouterLink to="/pokemons" class="nav-item link-underline link-underline-opacity-0">
            <h3 class="nav-link active">Pokemons</h3>
          </RouterLink>
        </ul>
      </div>
      <form class="d-flex mx-2 w-64" role="search">
          <input class="form-control me-2 w-64" type="search" placeholder="Pokemon" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>
    </div>
  </nav>


  <RouterView/>


</template>

<style scoped></style>
