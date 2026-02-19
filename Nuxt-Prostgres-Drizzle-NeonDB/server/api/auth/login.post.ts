import { usersTable } from '~~/server/db/schema';
import {LoginSchema} from '#shared/zod/login.schema';
import { db } from '~~/server/db';
import { eq } from 'drizzle-orm';


export default eventHandler (async (event) => {

    //Obtencion de datos
    const {email, password} = await readValidatedBody(event,LoginSchema.parse);
    // Busqueda de usuario
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    //Validacion
    if(!user){
        throw createError({
            statusCode:400,
            statusMessage: "No user with this email or email not valid",
        });
    }  

    //Validacion de contraseña
    const isPasswordValid = await verifyPassword(user.password,password)

    //Validacion de contraseña
    if(!isPasswordValid){
        throw createError({
            statusCode:400,
            statusMessage: "Password incorrect or not Valid",
        });
    }  

    //Creacion de sesion para nuestro usuario
    await setUserSession(event, {user:{
        id:user.id,
        email: user.email,
    }});



    //retornar funciones 
    return {
        message:"Loged successsfully",
    };  
})

