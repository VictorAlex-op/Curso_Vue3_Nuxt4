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

  await userStore.LoginUser(email.value, password.value)
  router.push('/')
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1>Bienvenido</h1>
      <p class="subtitle">Inicia sesión para continuar</p>

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
            placeholder="Contraseña"
            v-model.trim="password"
          />
        </div>

        <button :disabled="userStore.loadingUser">
          {{ userStore.loadingUser ? 'Cargando...' : 'Iniciar sesión' }}
        </button>

      </form>

      <RouterLink to="/register" style="margin-top: 20px;" >Registrate</RouterLink>

    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e293b, #0f172a);
}

.login-card {
  background: white;
  padding: 40px;
  width: 350px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.login-card h1 {
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
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover:not(:disabled) {
  background: #2563eb;
}

button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}
</style>
