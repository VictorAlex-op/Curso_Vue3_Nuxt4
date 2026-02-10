<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

//Pokemon
var pokemon = ref({})
const description = ref('')

const route = useRoute()
const getPokemon = async () => {
    try {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
        pokemon.value = data
        const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${route.params.name}`)
        const flavorES = speciesRes.data.flavor_text_entries.find(entry => entry.language.name === 'es')
        if (flavorES) {
         description.value = flavorES.flavor_text.replace(/[\n\f]/g, ' ')
        }
    } catch (error) {
        console.error(error)
    }
}
getPokemon()

</script>

<template>
  <div class="container-fluid text-center" v-if="pokemon.sprites">
    <div class="row align-items-center mt-4">
        <span class="col"></span>
        <div class="card col-3 mb-3 ">
            <img :src="pokemon.sprites.front_default" class="mx-auto d-block" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ pokemon.name }} - {{ pokemon.id }}</h5>
                <p class="card-body">
                    {{ description }}
                </p>
            </div>
        </div>
        <span class="col"></span>
    </div>
  </div>
</template>