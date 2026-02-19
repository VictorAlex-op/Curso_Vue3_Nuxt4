interface TestResponse { //Respuesta o mensaje 
  message: string
}

/*Funcion de api
export default defineEventHandler(async (event): Promise<TestResponse> => {
  return {
    message: "Hola desde el API"
  }
})
*/

/* Para buscar un usuario /api/users/5

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")

  return {
    userId: id
  }
})
*/

/* Leer querys /api/test?search=alex

export default defineEventHandler((event) => {
  const query = getQuery(event)

  return {
    search: query.search
  }
})
*/