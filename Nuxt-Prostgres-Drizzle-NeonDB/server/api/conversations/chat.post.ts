export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Message is required"
    })
  }
  console.log("OPENROUTER KEY:", config.openrouterApiKey)
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${config.openrouterApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "stepfun/step-3.5-flash:free",
      messages: [
        {
          role: "user",
          content: body.message
        }
      ]
    })
  })

  const data = await response.json()

  if (!response.ok) {
    console.error(data)
    throw createError({
      statusCode: response.status,
      statusMessage: "OpenRouter Error"
    })
  }

  return {
    reply: data.choices?.[0]?.message?.content || "No response"
  }
})