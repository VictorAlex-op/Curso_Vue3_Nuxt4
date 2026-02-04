<script setup>
import {ref, computed} from "vue"

const name = "Vue Dinamico"
const color = "color:blue"
const verde = "color:green"
const colores = ["blue","red","yellow"]
const nombres = ["miriam","beto","geovani","victor","alejandro","ehekal","mich"]
const arrayFrutas = [
    {
        name: "Manzana",
        price: "$1.00",
        description: "Una manzana",
        stock: 0,
    },
    {
        name: "Pera",
        price: "$2.00",
        description: "Una pera",
        stock: 10,
    },
    {
        name: "Naranja",
        price: "$3.00",
        description: "Una naranja",
        stock: 20,
    },
];
const fruta = {
        name: "Manzana",
        price: "$1.00",
        description: "Una manzana",
        stock: 0,
}

//Methods
const handleClick = (mensaje) => {
  console.log(mensaje)
}

var numero = ref(0);
const sumar = () => {
  numero.value++
  console.log("aumentar contador")
}

const restar = () => {
  numero.value--
  console.log("restar contador")
}

// Computados -->
//computed no puedes hacer dejar de hacer un return y debe necesariamente estar en una funcion flecha
const contador = computed(()=>{
  if(numero.value === 0){
    return "Cero"
  } else if (numero.value >= 1) {
    return "positivo"
  } else if (numero.value <= 0) {
    return "negativo"
  }
})

const active = true
const numeros_fav = []

//Actividad
const set_num = (i) => {
  const esta = numeros_fav.includes(i)  
  if(esta){
    active = false
  } else if (esta === false) {
    numeros_fav.push(numero.value)
  }
}


</script>

<template>

  <h1>Hola {{ name .toUpperCase()}}</h1> <!-- interpolacion de datos -->
  <h2 v-bind:style="color">Soy azul</h2> <!-- v-bind es para poder colocar propiedades -->
  <h2 :style="verde">Soy verde</h2> <!-- el v-bind tambien puede ser solo : y ya -->
  <h3 :style="`color:${colores[1]}`">{{ colores }}</h3> <!-- interpolacion de datos -->
  <h2> 
    {{ active ? "Estoy activo" : "No estoy activo" }}
  </h2>

  <!-- Directivas if -->

  <p v-if="active">Estoy activo</p> <!-- Directiva v-if -->
  <p v-else>Estoy inactivo</p> <!-- Directiva v-else -->
  <p v-if="active === true">Estoy activo</p> <!-- Directiva v-if -->
  <p v-else-if="active === false">Estoy inactivo</p> <!-- Directiva v-else-if -->
  <p v-else>Estoy nullo</p>

  <h2 v-show="active">Estoy activo</h2> <!-- v-show Es para desaparecer elementos en css -->

  <!-- Directivas para for  -->
  <ul>
    <li v-for="nombre in nombres">{{ nombre }}</li> <!-- v-for Es para los elementos en listas o en arrays -->
    <!-- <li v-for="(nombre , index) in nombres">{{index}} - {{nombre}}</li>  tambien puedes poner parametros -->
    <!-- <li v-for="(nombre , index) in nombres":key="index">{{index}} - {{nombre}}</li> para pasar los nodos -->
  </ul>

  <ul>
    <li v-for="fruta in arrayFrutas":key="fruta.name"> <!-- directiva v-for con destructuracion de datitos -->
      {{ fruta.name }} - {{ fruta.price }} - {{ fruta.description }} - {{ fruta.stock }}
    </li>
  </ul>

  <ul>
    <li v-for="(value,propiedad,index) in fruta":key="value"> <!-- directiva v-for para recorrer un solo objeto -->
      {{ index }} - {{ propiedad }} - {{ value }}
    </li>
  </ul>

  <ul>
    <template v-for="fruta in arrayFrutas":key="fruta.name"> <!-- v-for deberia tener mayor jerarquia para rendirizar todo fragment -->
      <li v-if="fruta.stock > 0"> <!-- v-if tiene mas peso que v-for -->
        {{ fruta.name }} - {{ fruta.price }} - {{ fruta.description }} - {{ fruta.stock }}
      </li>
    </template>
  </ul>

  <!-- directivas para botones -->
  <button v-on:click="handleClick('Boton 1')">Activame</button> <!-- v-on para activar metodos -->
  <button @click="handleClick('Boton 2')">Activame</button> <!-- abreviatura -->

  <button v-on:click.right="handleClick('click derecha')">Derecha</button> <!-- .right para derecha -->
  <button v-on:click.middle="handleClick('boton medio')">Medio</button> <!-- .middle para el centro -->
  <button v-on:click.left="handleClick('click izquierda')">Izquierda</button> <!-- .left para la izquierda -->

  <!-- Hay que tener por lo menos un elemento reactivo para que pueda volver una carga a la pantalla principal
  por ello se usa el ref para que es elemento nos renderize cada vez que el contador se actualize 
  Actividad--> 
  <h2 :class="contador">{{ numero }}</h2>
  <button @click="sumar()">+ 1</button>
  <button @click="restar()">- 1</button>
  <button :disabled="!active" @click="set_num(numero)"> {{ active ? "Guardar" : "El numero ya esta guardado" }}  </button>
  <ul>
    <li v-for="numero in numeros_fav">{{ numero }}</li>
  </ul>

  



</template>

<style>
h1{color:brown}
.positivo {
  color: green;
}
.negativo{
  color:red
}
.Cero{
  color:grey
}

</style>