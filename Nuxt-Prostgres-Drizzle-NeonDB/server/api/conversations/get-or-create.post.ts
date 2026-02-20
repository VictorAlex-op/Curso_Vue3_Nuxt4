import { db } from "~~/server/db"
import { conversations } from "~~/server/db/schema"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId } = body

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "userId requerido"
    })
  }

  const existing = await db
    .select()
    .from(conversations)
    .where(eq(conversations.userId, userId))
    .limit(1)

  if (existing.length > 0) {
    return { conversation: existing[0] }
  }

  const created = await db
    .insert(conversations)
    .values({
      userId,
      title: "Nueva conversación"
    })
    .returning()

  return { conversation: created[0] }
})