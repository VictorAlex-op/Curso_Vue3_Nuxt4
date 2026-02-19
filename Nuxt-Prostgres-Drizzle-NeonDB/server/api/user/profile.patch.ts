import { usersTable } from '~~/server/db/schema';
import { db } from '~~/server/db';
import { eq } from 'drizzle-orm';
import {profileSchema} from '~~/shared/zod/profile.chema'

export default eventHandler (async (event) => {

    //Obtencion de sesion activa
    const {user} = await requireUserSession(event)

    const {username,bio,name,email} = await readValidatedBody(event, profileSchema.parse)

    //Busqueda de mi usuario atravez de la sesion
    const [userProfile] = await db.select().from(usersTable).where(eq(usersTable.id,user.id));

    //validacion de mi busqueda
    if(!userProfile){
        throw createError({
            statusCode:404,
            statusMessage:"User not found"
        })
    }

    //Actualizar la info
    await db.update(usersTable).set({username,bio,name,email}).where(eq(usersTable.id,user.id))

    //retornando la informacion
    return{
        message:"User successfully update",
    }   


})