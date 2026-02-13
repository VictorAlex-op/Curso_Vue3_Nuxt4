<script setup>
import { reactive, onMounted, ref } from "vue"
import { getAuth, updateProfile } from "firebase/auth"
import { message } from "ant-design-vue"

const auth = getAuth() // Elemento de Firebase
const loading = ref(false)

const form = reactive({ // Es para hacer reactivo todos los elementos que necesitas en vez de poner solo ref en todos
  displayName: "",
  email: "",
  photoURL: ""
})

onMounted(() => {
  const user = auth.currentUser
  if (user) {
    form.displayName = user.displayName || ""
    form.email = user.email || ""
    form.photoURL = user.photoURL || ""
  }
})

const handleUpdate = async () => {
  const user = auth.currentUser
  if (!user) return

  loading.value = true

  try {
    await updateProfile(user, {
      displayName: form.displayName,
      photoURL: form.photoURL
    })
    message.success("Perfil actualizado")
  } catch (error) {
    message.error(error.message)
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <div style="padding: 24px;">
    <a-page-header
      title="Perfil de Usuario"
      style="border: 1px solid #f0f0f0; margin-bottom: 24px;"
    />

    <a-card style="max-width: 600px; margin: auto;">
      <a-form layout="vertical" @submit.prevent="handleUpdate">

        <div style="text-align: center; margin-bottom: 24px;">
            <a-avatar :size="120" :src="form.photoURL">
                <template v-if="!form.photoURL">
                <UserOutlined />
                </template>
            </a-avatar>
        </div>

        <a-form-item label="Nombre">
            <a-input v-model:value="form.displayName" />
        </a-form-item>

        <a-form-item label="Correo">
          <a-input v-model:value="form.email" disabled />
        </a-form-item>

        <a-form-item label="Foto (URL)">
          <a-input v-model:value="form.photoURL" />
        </a-form-item>

        <div style="text-align: right;">
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
          >
            Actualizar Perfil
          </a-button>
        </div>

      </a-form>
    </a-card>
  </div>
</template>
