import {RegisterSchema} from '#shared/zod/register.schema';
import { usersTable } from '~~/server/db/schema';
import type { InsertUser } from '~~/server/db/schema';
import { db } from '~~/server/db';
import { eq } from 'drizzle-orm';


export default eventHandler(async (event) => {

    //Resivir informacion
    const {email,password,username} = await readValidatedBody(event, RegisterSchema.parse);

    //Buscar usuario 
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    //Validacion de existencia
    if(user){
        throw createError({
            statusCode:400,
            statusMessage: "User already existing with this email",
        });
    }  

    // Registro   
    const hashedPassword = await hashPassword(password);
    
    const newUser: InsertUser = {
        email,
        username,
        password : hashedPassword
    }
    
    await db.insert(usersTable).values(newUser);


    return {
        message:"User registered successsfully",
        data:{email, hashedPassword, username}
    };
});