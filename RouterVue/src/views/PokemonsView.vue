<script setup>
import { computed, ref } from 'vue';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

//Paginación
let pagination = 100
const paginaActual = ref(1)
const totalPokemons = ref(0)
const loading = ref(true)


//Elemento Reactivo
const pokemons = ref([])
const PokeApi = async() => {
    try {
        const offset = (paginaActual.value - 1) * pagination
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pagination}`).finally(()=>loading.value = false)
        const results = res.data.results
        totalPokemons.value = res.data.count
        const detailedPokemons = await Promise.all(
            results.map(pokemon => axios.get(pokemon.url).then(r => r.data))
        )
        pokemons.value = detailedPokemons
        console.log(pokemons.value)
    } catch (error) {
        console.error(error)
    }
}
PokeApi()

const paginas = computed(()=>Math.ceil(totalPokemons.value/pagination))

const irAPagina = (pagina) => {
    if(pagina < 1 || pagina > paginas.value)return 
        paginaActual.value = pagina
        PokeApi()
}


</script>

<template>

<div class="container">
    <h1>Pokemons</h1>
</div>

<LoadingSpinner v-if="loading"/>
<div class="container" v-else>
    <table class="table table-info">
        <thead class="my-2">
            <tr>
                <th class="table-success">#</th>
                <th class="table-success">Nombre</th>
                <th class="table-success">Imagen</th>
                <th class="table-success">Peso</th>
            </tr>
        </thead>
        <tbody class="my-2">
            <tr class="table-info" v-for="pokemon in pokemons":key="pokemon.name">
                <td class="table-primary ">{{ pokemon.id }}</td>
                <td class="table-primary">
                    <RouterLink :to="`/pokemon/${pokemon.name}`">{{ pokemon.name }}</RouterLink>
                </td>
                <td class="table-primary"><img :src="pokemon.sprites.front_default" alt=""></td>
                <td class="table-primary">{{ pokemon.weight }}</td>
            </tr>
        </tbody>
    </table>
    <nav aria-label="Page navigation" class="mt-4">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: paginaActual === 1 }">
            <a class="page-link" href="#" @click.prevent="irAPagina(paginaActual - 1)">
                &laquo;
            </a>
            </li>
            <li class="page-item" v-for="page in paginas ":key="page" :class="{ active: page === paginaActual }">
            <a class="page-link" href="#" @click.prevent="irAPagina(page)">
                {{ page }}
            </a>
            </li>
            <li class="page-item" :class="{ disabled: paginaActual === paginas  }">
            <a class="page-link" href="#" @click.prevent="irAPagina(paginaActual + 1)">
                &raquo;
            </a>
            </li>
        </ul>
    </nav>

</div>

</template>

<style>
</style>