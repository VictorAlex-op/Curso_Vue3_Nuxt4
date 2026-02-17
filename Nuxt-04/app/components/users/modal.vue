<script setup lang="ts">
import type { user } from '~/pages/types/user-interface'
import { watch, onMounted } from 'vue'

interface Props {
  modelValue: boolean
  usuario: user | null
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

let modalInstance: any = null

onMounted(async () => {
  const { Modal } = await import('bootstrap')
  const modalElement = document.getElementById('userModal')
  if (modalElement) {
    modalInstance = new Modal(modalElement)
  }
})

watch(
  () => props.modelValue,
  (value) => {
    if (!modalInstance) return
    value ? modalInstance.show() : modalInstance.hide()
  }
)

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <div
    class="modal fade"
    id="userModal"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" v-if="usuario">

        <div class="modal-header">
          <h5 class="modal-title">
            {{ usuario.id }} - {{ usuario.name }}
          </h5>
          <button
            type="button"
            class="btn-close"
            @click="close"
          ></button>
        </div>

        <div class="modal-body">
          <p><strong>Username:</strong> {{ usuario.username }}</p>
          <p><strong>Email:</strong> {{ usuario.email }}</p>
          <p><strong>Ciudad:</strong> {{ usuario.address.city }}</p>
          <p><strong>Empresa:</strong> {{ usuario.company.name }}</p>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="close"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
