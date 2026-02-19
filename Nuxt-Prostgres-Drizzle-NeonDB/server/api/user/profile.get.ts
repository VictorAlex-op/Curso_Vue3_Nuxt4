import { usersTable } from '~~/server/db/schema';
import { db } from '~~/server/db';
import { eq } from 'drizzle-orm';

export default eventHandler (async (event) => {

    //Obtencion de sesion activa
    const {user} = await requireUserSession(event)

    //Busqueda de mi usuario atravez de la sesion
    const [userProfile] = await db.select().from(usersTable).where(eq(usersTable.id,user.id));

    //validacion de mi busqueda
    if(!userProfile){
        throw createError({
            statusCode:404,
            statusMessage:"User not found"
        })
    }

    //retornando la informacion
    return{
        message:"User successfully found",
        id:userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        username: userProfile.username,
        bio:userProfile.bio,
        avatar:userProfile.avatarURL
    }   


})