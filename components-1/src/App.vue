<script setup>
import {ref} from "vue";
import BlogPost from './components/BlogPost.vue';
import ButtonCounter from './components/ButtonCounter.vue'
import PaginatorPost from "./components/PaginatorPost.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

//elemento reactivo
const posts = ref([])

//Fetch async
const obtenerPost = async() => {
  try{
    const res = await fetch("https://jsonplaceholder.typicode.com/posts").finally(()=> loading.value = false)
    const data = await res.json()
    posts.value = data;
  } catch (err) {
    console.error(err)
  }
}  
//Activacion
obtenerPost()

//Emicion de evento "Emit"
const favorite = ref('')
const handleFavorite = (post) => {
  favorite.value = post
}

//Paginación
let pagination = 10
const initial = ref(0)
const final = ref(pagination)
const loading = ref(true)

const nextPage = () => {
  initial.value = initial.value + pagination;
  final.value = final.value + pagination;
}

const prevPage = () => {
  initial.value -= pagination;
  final.value -= pagination;
}


</script>

<template>
  <LoadingSpinner v-if="loading"/>
  <div class="container" v-else > <!-- siempre que este seguido del v-if no pasa nada -->
    
    <h1 class="mb-5 text-center">Practicas de Elementos reactivos (Props,Emits,Componentes)</h1>

    <h2 class="mt-2">Mi post Favorito: {{ favorite }}</h2>
    <!--<ButtonCounter/> componente de boton ! -->
    <PaginatorPost @nextpage="nextPage" @prevpage="prevPage" :inital="initial" :final="final" :index="posts.length" class="my-2 align-itself-center"/>
    <BlogPost class="mb-2" v-for="post in posts.slice(initial,final)":key="post.id" :title="post.title" :id=post.id :body="post.body"
    @handleFavorite="handleFavorite"/> 
  </div>


</template>

<style>
</style>


<!--
<script>
import ref from "vue";

//Setup es un hook dedicado a una composicion API dentro de los componentes
export default {
  setup(){
    const counter = ref(0)

    const increment = () => {
      counter.value ++
    }

    return {counter,increment} // Requiere retornar los elementos (variables o funciones)
  }
}
</script>


<script>
//Todo esto es un objeto
export default {
  data(){ // Todos lo elementos salidos de aqui se vuelven reactivos
    return{
      counter:0
      
    }
  },
  methods:{ // Estos son los metodos 
    increment(){
      this.counter ++ // Asi se usan las variables o datos
    }
  },
}
</script>

<!-- <script setup></script> basicamente es esto pero mas chico y sencillo  -->