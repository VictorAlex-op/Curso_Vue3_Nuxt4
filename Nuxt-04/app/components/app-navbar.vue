<script setup lang="ts">
</script>

<template>
      <div class="container mb-4">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">Home</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/contact">Contact</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/users">User</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/users/create">User/Create</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/login">Login</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/register">Register</NuxtLink>
            </li>
          </div>
        </nav>
      </div>
</template>