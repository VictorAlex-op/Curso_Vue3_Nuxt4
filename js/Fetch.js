/* Peticiones HTTP con fetch
    Para consumir api que son respuestas del server que podemos consumir
    en nuestro sitio web
    
    fetch("https://pokeapi.co/api/v2/pokemon/").then( res => res.json()).then(data => console.log(data))    
    metodo ---- URL ------------------------- funciones y demas para sustraer la data
*/

//Peticion get normal
//fetch("https://pokeapi.co/api/v2/pokemon/").then( res => res.json()).then(data => console.log(data))

//Peticion get para hacer un foreach de cada objeto y mandarlo a pantalla
/* 
fetch("https://pokeapi.co/api/v2/pokemon/").then( res => res.json()).then(data => { 
    let arraysNombres = []
    data.results.forEach(element => {
        arraysNombres.push(element.name)
        console.log(arraysNombres) // console.log(element.name) incluso podemos destructurar aun más los datos
    })
})
.catch(error => console.error(error)) // El elemento catch se usa para verificar si mi peticion se hizo de manera correcta
*/

/* Await y Async -> Basicamente funciones asyncronas*/
const ObtenerPokemons = async() => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/") // await esperar a que me conteste
      const data = await res.json() // esperar a que me conteste 
      //console.log(data.results)
      const nombres = data.results.map(poke => poke.name) // Funcion map para mapear objetos, propiedades o elementos
      const butterfree = data.results.filter(poke => poke.name === "butterfree") // Funcion filter para busquedas que requieren algo en concreto
      console.log(nombres)
      console.log(butterfree)
    } catch (err) {
        console.error(err)
    }
}
//mandar a llamar una funcion
ObtenerPokemons()