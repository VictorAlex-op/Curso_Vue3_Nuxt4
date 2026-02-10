import {defineStore} from 'pinia'
import { computed, ref } from 'vue'


export const useCounterStore = defineStore('counter',() => {
    const count = ref(0) // dato reactivo
    const increment = () => count.value ++ // funcion
    const double = computed(()=> count.value * 2) //dato computado

    return {
        count,
        increment,
        double
    }
})






/*
//Diferentes estados de modularizacion
export const useCounterStore = defineStore('counter',{
    state: () => ({ //datos reactivos
        count:0,
    }),
    actions: { //Metodos o Funciones
        increment(){
            this.count ++
        }
    },
    getters: { //Propiedades computadas
        double:(state) => state.count * 2
    }

}) 
*/