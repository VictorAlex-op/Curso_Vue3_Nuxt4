<script setup>
//Props son usados para enviar datos o elementos dinamicos
//const props = defineProps(['title','id','body','colorText']) //Es para traer parametros que mandemos para definirlos 
//console.log(props.title)


// Se puede pasar como un objeto directamente y tambien podemos decirle que tipo de dato es
defineProps({
    title:String,
    id:Number,
    body:{
        type:String,
        default:"Sin descripcion"
    }
    //handleFavorite : function <--- No se sugiere hacer esto para funciones no es optimo 
})

const emit = defineEmits(['handleFavorite']) //Esto te permite hacer solo un metodo no un metodo global global
// emit('handleFavorite',title) <-- Respuesta en objeto
</script>

<template>
    <div class="card mt-2">
        <div class="card-body">
            <h5 class="card-title">{{id}} - {{title}}</h5>
            <p>
                {{ body }}
            </p>
            <button @click="emit('handleFavorite', title)" class="btn btn-outline-primary">Favorite</button> <!-- Emit -->
            <!-- Se usa click y la palabra $emit le pasasas el nombre de tu funcion junto con sus parametros  -->
        </div>
    </div>


</template>