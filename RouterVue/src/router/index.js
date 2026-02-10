import AboutView from '@/views/AboutView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ // Rutas de mi app 
    {
      path:'/',
      name:'home',
      component: () => import("../views/HomeView.vue")
    },
    {
      path:'/about',
      name:'about',
      component:AboutView // De esta manera carga todos los componentes
    },
    {
      path:'/pokemons',
      name:'pokemons',
      component: () => import("../views/PokemonsView.vue"), //Lazy Load
    },
    {
      path:'/pokemon/:name',
      name:'pokemon',
      component: () => import("../views/PokemonView.vue"), //Lazy Load
    }
  ], 
})

export default router //Exportacion de mi router
