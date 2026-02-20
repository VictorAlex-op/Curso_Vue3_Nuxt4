import {
  text,
  pgTable,
  serial,
  varchar,
  uuid,
  timestamp,
  integer
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

/* ===========================
   USERS
=========================== */

export const usersTable = pgTable('user_table', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: varchar('password', { length: 225 }).notNull(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  bio: text('bio'),
  avatarURL: text('avatar_url'),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

/* ===========================
   CONVERSATIONS
=========================== */

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: integer("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),

  sessionId: uuid("session_id"), // opcional si quieres separar por sesión

  title: varchar("title", { length: 255 }),

  summary: text("summary"), // memoria comprimida

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

/* ===========================
   MESSAGES
=========================== */

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),

  conversationId: uuid("conversation_id")
    .references(() => conversations.id, { onDelete: "cascade" })
    .notNull(),

  role: varchar("role", { length: 20 }).notNull(), // system | user | assistant

  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull()
})

/* ===========================
   RELATIONS
=========================== */

export const usersRelations = relations(usersTable, ({ many }) => ({
  conversations: many(conversations)
}))

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [conversations.userId],
    references: [usersTable.id]
  }),
  messages: many(messages)
}))

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id]
  })
}))

/* ===========================
   TYPES
=========================== */

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type InsertConversation = typeof conversations.$inferInsert
export type SelectConversation = typeof conversations.$inferSelect

export type InsertMessage = typeof messages.$inferInsert
export type SelectMessage = typeof messages.$inferSelect