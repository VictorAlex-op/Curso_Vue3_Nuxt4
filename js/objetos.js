/* Objetos 
    Estos mismos son similares a los json pueden almacernar x cantidad de propiedades
    por lo general podemos mapear, estructurarlos y destructurarlos.
*/
const mascota = {
    nombre:"Canelo",
    edad:5,
    vivo:true
}
// puedes añadir nuevos parametros o valores
mascota.id = 1
mascota.juguetes = ["Peluche A","Peluche B"] 
// Objeto completo
console.log(mascota)
// Obtencion de solo un elemento o valor 
console.log(mascota.nombre)
// Tambien podrias acceder a los mismos arrays
console.log(mascota.juguetes[0])

/* Destrucutracion de objetos 
    Estas son la maneras en como podemos divivir las propiedades de objetos o 
    elementos de los objetos para obtener datos que sean solo necesarios como
    en los anteriores 2 casos de log
*/

// destructuracion extrae solo lo que quieres
const {edad,nombre} = mascota
console.log(edad,nombre)

//Practica
const web = {
    nombre:"bluuweb",
    links : {
        enlace:"www.bluueweb.com"
    },
    redesSociales:{
        youtube:{
            enlace: "youtube.com/bluueweb",
            nombre: "bluue yt"
        },
        facebook:{
            enlace: "facebook.com/bluueweb",
            nombre: "bluuefacebook"
        }
    }
}

console.log(web.redesSociales.youtube.enlace) // Un elemento
const {enlace} = web.redesSociales.youtube // un elemento
console.log(enlace)
