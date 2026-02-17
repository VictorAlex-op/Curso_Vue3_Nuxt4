<script setup lang="ts">
import Modal from '~/components/users/modal.vue'
import type { user } from '../types/user-interface'

const route = useRoute()

const { data: userData, error } = await useFetch<user>(
  `https://jsonplaceholder.typicode.com/users/${route.params.uid}`
)

const showModal = ref(false)
</script>

<template>
  <div class="container">
    <h1>Detalles de Usuario</h1>

    <div v-if="error">
      {{ error.message }} - {{ error.statusMessage }}
    </div>

    <div v-else-if="userData">
      <p>Nombre: {{ userData.name }}</p>
      <p>Usuario: {{ userData.username }}</p>
      <p>Correo: {{ userData.email }}</p>

      <button @click="showModal = true">
        Ver más detalles
      </button>
    </div>

    <Modal
      v-model="showModal"
      :usuario="userData ?? null"
    />
  </div>
</template>
