<script setup lang="ts">
import Chatbox from '~/components/Chatbox.vue'



const { data: profile, error } = await useFetch('/api/user/profile')
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10">

    <!-- Error -->
    <div v-if="error" class="text-red-500">
      Error Loading Profile {{ error.message }}
    </div>

    <!-- Contenido -->
    <div v-else-if="profile" class="w-full max-w-4xl">

      <!-- 🔥 Banner -->
      <div class="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 mb-6">

        <!-- Avatar -->
        <img
          :src="profile.avatar || ''"
          alt="User Avatar"
          class="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
        />

        <!-- Info -->
        <div>
          <h2 class="text-xl font-semibold">
            {{ profile.username }}
          </h2>
          <p class="text-gray-500 text-sm">
            Conversando con tu asistente virtual
          </p>
        </div>

      </div>

      <!-- 💬 Chat -->
      <Chatbox :userId="profile.id"></Chatbox>
    </div>

  </div>
</template>