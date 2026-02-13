<script setup>
import { useUserStore } from '../stores/userStore'
import { ref } from 'vue'
import router from "../router.js"

const userStore = useUserStore()
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  if (!email.value || !password.value || password.value.length < 6) {
    return alert('Verifica tus datos')
  }

  await userStore.registerUser(email.value, password.value)
  router.push('/')
}
</script>

<template>
  <div class="register-wrapper">
    <div class="register-card">
      <h1>Crear Cuenta</h1>
      <p class="subtitle">Únete y comienza tu viaje</p>

      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            v-model.trim="email"
          />
        </div>

        <div class="input-group">
          <input
            type="password"
            placeholder="Contraseña (mínimo 6 caracteres)"
            v-model.trim="password"
          />
        </div>

        <button :disabled="userStore.loadingUser">
          {{ userStore.loadingUser ? 'Creando cuenta...' : 'Registrar' }}
        </button>
      </form>

      <RouterLink to="/login" style="margin-top: 20px;" >Inicia Sesion</RouterLink>

    </div>
  </div>
</template>

<style scoped>
.register-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
}

.register-card {
  background: white;
  padding: 40px;
  width: 350px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.register-card h1 {
  margin-bottom: 8px;
  font-size: 24px;
  color: #1e293b;
}

.subtitle {
  margin-bottom: 24px;
  font-size: 14px;
  color: #64748b;
}

.input-group {
  margin-bottom: 16px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  outline: none;
  transition: all 0.2s ease;
}

.input-group input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #22c55e;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover:not(:disabled) {
  background: #16a34a;
}

button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}
</style>
