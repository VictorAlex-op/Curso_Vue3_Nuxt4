<script setup>
import {ref} from "vue";

const emit = defineEmits(['nextpage','prevpage'])
defineProps(['inital','final','index'])

//Siguiente pagina
const nextPage = () => {
    emit('nextpage')
}
//anterior
const prevPage = () => {
    emit('prevpage')
}


</script>


<template>
    <div class="btn-group" role="group" aria-label="Basic example">
        <button :disabled="inital === 0" @click="prevPage" type="button" class="btn btn-outline-primary">Anterior</button>
        <button :disabled="final === index" @click="nextPage" type="button" class="btn btn-outline-primary">Siguiente</button>
    </div>
</template>

<style>
</style>