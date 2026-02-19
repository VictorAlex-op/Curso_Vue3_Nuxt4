import { avatar } from "#build/ui";
import { integer, text, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable('user_table',{
    id:serial('id').primaryKey(),
    name:text('name'),
    email:text('email').notNull().unique(),
    password:varchar('password',{length:225}).notNull(),
    username:varchar('username',{length:100}).notNull().unique(),
    bio:text('bio'),
    avatarURL:text('avatar_url')
});

export type InsertUser = typeof usersTable.$inferInsert; // Inserciones a la tabla de usuarios
export type SelectUser = typeof usersTable.$inferSelect; // Selecciones de la tabla de usuarios 

