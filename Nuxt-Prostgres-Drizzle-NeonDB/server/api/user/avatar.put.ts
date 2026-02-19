import { usersTable } from '~~/server/db/schema'
import { db } from '~~/server/db'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { promises as fs } from 'node:fs'
import { fileTypeFromBuffer } from 'file-type'
import sharp from 'sharp'
import path from 'node:path'

export default eventHandler(async (event) => {

  // 🔐 Obtener sesión activa
  const { user } = await requireUserSession(event)

  // 📦 Leer multipart
  const parts = await readMultipartFormData(event)

  if (!parts || !parts.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file received'
    })
  }

  // 🎯 Buscar archivo por nombre
  const filePart = parts.find(p => p.name === 'file')

  if (!filePart || !filePart.data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No image uploaded'
    })
  }

  const buffer = Buffer.from(filePart.data)

  // 📏 Validar tamaño (5MB)
  const MAX_BYTES = 5 * 1024 * 1024

  if (buffer.length > MAX_BYTES) {
    throw createError({
      statusCode: 413,
      statusMessage: 'File too large'
    })
  }

  // 🧠 Detectar tipo real del archivo
  const ft = await fileTypeFromBuffer(buffer)

  if (!ft || !ft.mime.startsWith('image/')) {
    throw createError({
      statusCode: 415,
      statusMessage: 'Unsupported image type'
    })
  }

  // 👤 Buscar usuario
  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1)

  if (!existingUser) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  // 🖼 Procesar imagen (siempre convertir a JPG optimizado)
  const processedBuffer = await sharp(buffer)
    .rotate()
    .resize(500, 500, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 85 })
    .toBuffer()

  // 📁 Crear carpeta si no existe
  const uploadsDir = path.join(
    process.cwd(),
    'public',
    'uploads',
    'avatars'
  )

  await fs.mkdir(uploadsDir, { recursive: true })

  // 🧹 Borrar avatar anterior si existe
  if (
    existingUser.avatarURL &&
    typeof existingUser.avatarURL === 'string' &&
    existingUser.avatarURL.startsWith('/uploads/avatars/')
  ) {
    try {
      const prevPath = path.join(
        process.cwd(),
        'public',
        existingUser.avatarURL.replace(/^\//, '')
      )
      await fs.unlink(prevPath).catch(() => null)
    } catch {
      // Ignorar errores silenciosamente
    }
  }

  // 🆕 Generar nuevo nombre
  const filename = `${user.id}-${Date.now()}-${randomUUID()}.jpg`
  const filePath = path.join(uploadsDir, filename)

  await fs.writeFile(filePath, processedBuffer)

  const url = `/uploads/avatars/${filename}`

  // 💾 Guardar en DB
  await db
    .update(usersTable)
    .set({ avatarURL: url })
    .where(eq(usersTable.id, user.id))

  // 🚀 Respuesta
  return {
    message: 'Avatar updated successfully',
    avatarURL: url
  }
})
