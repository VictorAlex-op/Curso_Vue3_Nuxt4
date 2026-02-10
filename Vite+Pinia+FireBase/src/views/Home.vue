<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import { useDatabaseStore } from '../stores/database';
const database = useDatabaseStore()

const router = useRouter();
database.getUrls()
const url = ref('')

const handleSubmit = () => {
    database.addUrl(url.value)
}

onBeforeMount(() => {
  database.getUrls()
})
</script>

<template>
    <div>
        <h1>Home</h1>
    </div>

    <div>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Agregar</button>
        </form>
    </div>
    <p v-if="database.loadingDoc">Loading docs.....</p>
    <div v-else>
        <ul>
            <li v-for="url of database.documents":key='url.id'>#{{url.id}} <br> {{ url.name }} <br> {{ url.short }}
                <div>
                    <button @click="database.deleteUrl(url.id)" :disabled="database.loadingDoc">
                        Eliminar
                    </button>
                    <button @click="router.push(`/editar/${url.id}`)">
                        Editar
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

