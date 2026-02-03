//Funciones basicas las mas basicas ()
function sumar() {
    return(5+5)
}

//Funcion flecha
const restar = () => {
    return (10-5)
}

//Funcion flecha de solo una linea
const mult = () => (2*2)

/* 
    Puedes escribir de ciertas maneras la funcion flecha
    const mensaje = nombre => 'Hola soy' + nombre
    despues de la flecha puede retornar los que tu desees se usa mas que nada para renderizar 
    etiquetas html en codigo.
*/

const resultado = restar()
const result = mult()
const sumresult = sumar()

console.log(resultado)
console.log(result)
console.log(sumresult)

/*-- Template String--*/

// Template basico por envio de parametro
const numero = (num) => {
    return `El numero es:${num}`
}
/*  Otra manera de escribirlo 
const suma = (num1,num2) => `El numero es:${num1+num2}`
*/
const mensaje = numero(10)
console.log(mensaje)
