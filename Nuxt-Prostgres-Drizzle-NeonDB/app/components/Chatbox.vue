<script setup lang="ts">
import { ref, onMounted } from "vue"

/* ------------------------
   Tipos
------------------------ */

interface Message {
  role: "user" | "assistant"
  content: string
}

interface GetOrCreateResponse {
  conversation: {
    id: string
  }
}

interface ChatResponse {
  reply: string
}

/* ------------------------
   Props
------------------------ */

const props = defineProps<{
  userId: number
}>()

/* ------------------------
   State
------------------------ */

const conversationId = ref<string | null>(null)
const messages = ref<Message[]>([])
const input = ref("")
const loading = ref(false)

/* ------------------------
   Obtener o crear conversación
------------------------ */

const initConversation = async () => {
  const data = await $fetch<GetOrCreateResponse>("/api/conversations/get-or-create",
    {
        method: "POST",
        body: { userId: props.userId }
    }
    )

    if (data?.conversation?.id) {
    conversationId.value = data.conversation.id
    }
}

/* ------------------------
   Enviar mensaje
------------------------ */

const sendMessage = async () => {
  if (!input.value.trim() || !conversationId.value) return

  const userMessage = input.value

  messages.value.push({
    role: "user",
    content: userMessage
  })

  input.value = ""
  loading.value = true

  try {
    const data = await $fetch<ChatResponse>("/api/conversations/chat", {
        method: "POST",
        body: {
            conversationId: conversationId.value,
            message: userMessage
        }
    })

    if (data?.reply) {
    messages.value.push({
        role: "assistant",
        content: data.reply
    })
    }

  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  initConversation()
})
</script>

<template>
  <div class="flex flex-col h-[600px] max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border">

    <!-- Header -->
    <div class="p-4 border-b font-semibold text-lg">
      Asistente Virtual
    </div>

    <!-- Mensajes -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">

      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="[
          'max-w-xs px-4 py-2 rounded-2xl text-sm',
          msg.role === 'user'
            ? 'bg-blue-500 text-white ml-auto'
            : 'bg-gray-200 text-gray-800'
        ]"
      >
        {{ msg.content }}
      </div>

      <div v-if="loading" class="text-gray-400 text-sm">
        El asistente está escribiendo...
      </div>

    </div>

    <!-- Input -->
    <div class="p-4 border-t flex gap-2">
      <input
        v-model="input"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Escribe tu mensaje..."
        class="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        @click="sendMessage"
        class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </div>

  </div>
</template>