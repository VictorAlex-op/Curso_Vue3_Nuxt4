<script setup lang="ts">
import type { user } from '../types/user-interface';

definePageMeta({
    layout: "user-layout" 
});


const {data,error} = await useFetch<user[]>(`https://jsonplaceholder.typicode.com/users` );

</script>

<template>
    <div class="container">
        <h1>Lista de Usuarios</h1>
    </div>

    <div class="container">
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Usuario</th>
                <th scope="col">Correo</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in data" :key="user.id">
                    <th scope="row">{{ user.id }}</th>
                    <td><NuxtLink :to="`/users/${user?.id}`">{{ user?.name }}</NuxtLink></td>
                    <td>{{ user?.username }}</td>
                    <td>{{ user?.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>


</template>