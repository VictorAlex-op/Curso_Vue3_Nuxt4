<script setup lang="ts">

const {data:profile, error} = await useFetch('/api/user/profile')
</script>

<template>
    
    <div v-if="error">
        <p class="text-red-500"> Error Loading Profile {{ error.message }}</p>
    </div>
    <div v-else-if="profile">
        <p>Welcome {{ profile.username }}!</p>
    </div>

</template>