/*
    Tipos de datos 
    
    Primitivos 
        -Numericos -> Number, BigInt
        -No numericos -> String, Booleano, Null,Undefined,Symbol
    Objetos
        -> Objetos, Arrays, Funtion, Date, RegExp, Set, Map
*/
//String 
var nombre = "Alejandro"
//Number
var num = 22
//BigInt (Ambas maneras son correctas)
let x = 1234567890123456789012345n;
let y = BigInt(1234567890123456789012345)
//Booleano
var baron = true
//undefined
var novia = undefined
//Null ausencia de resultado
var novia = null
// Symbol
x = Symbol();
y = Symbol();
// Objecto
const person = {Nombre:"Victor", Apellido:"Oliva"};
//Array de objetos
const list = ["Porche","Bugatti","Ferrari"]
// Fecha
const date = new Date("2022-03-25");

/*Diferencias entre var, let, const*/

// Var basicamente una variable modificable 
var edad = 10
var edad = 20
console.log(edad);
// Let pueda ser modificable tambien pero solo de cierta manera
let cantidad = 10
cantidad = 20
console.log(cantidad);
// Const solo es una constante 
const numero = 50
console.log(numero)
