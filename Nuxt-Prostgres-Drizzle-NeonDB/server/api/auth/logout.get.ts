export default eventHandler (async (event) => {
    //Finalizacion de una sesion
    await clearUserSession(event);
    
    return{
        message:"Session Finalized",
    }
});