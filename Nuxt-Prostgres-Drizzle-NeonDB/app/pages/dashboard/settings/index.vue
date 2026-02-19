<script setup lang="ts">
import { select } from '#build/ui'
import type {ProfileTypeSchema } from '#shared/zod/profile.chema'
import {profileSchema} from '#shared/zod/profile.chema'
import type { FormSubmitEvent } from '@nuxt/ui'

const fileRef = ref<HTMLInputElement>()

const {data:user} = await useFetch('/api/user/profile')

const profile = reactive<Partial<ProfileTypeSchema>>({
  name: user.value?.name || '',
  email: user.value?.email || '',
  username: user.value?.username || '',
  avatar: user.value?.avatar || '',
  bio: user.value?.bio || ''
})
const toast = useToast()
async function onSubmit(event: FormSubmitEvent<ProfileTypeSchema>) {
  try {
    const res = await $fetch("/api/user/profile",{
      method:'PATCH',
      body:event.data,
    })
    toast.add({
    title: 'Success',
    description: 'Your settings have been updated.',
    icon: 'i-lucide-check',
    color: 'success'
    })
    console.log(res)
  } catch (error) {
    
  }
}

async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  const file = input.files[0]

  if (!file) return

  try {
    const formData = new FormData()
    formData.append('file', file)

    await $fetch('/api/user/avatar', {
      method: 'PUT',
      body: formData,
    })

    // Actualizar preview inmediatamente 
    profile.avatar = URL.createObjectURL(file)

    toast.add({
      title: 'Avatar updated',
      description: 'Your new avatar is looking fresh 🌊',
      icon: 'i-lucide-check',
      color: 'success'
    })

    // Opcional: refrescar datos reales desde backend
    await refreshNuxtData()

  } catch (error) {
    toast.add({
      title: 'Upload failed',
      description: 'Something went wrong uploading your avatar.',
      icon: 'i-lucide-x',
      color: 'error'
    })
  }
}

function onFileClick() {
  fileRef.value?.click()
}
</script>

<template>
  <UForm
    id="settings"
    :schema="profileSchema"
    :state="profile"
    @submit="onSubmit"
  >
    <UPageCard
      title="Profile"
      description="These informations will be displayed publicly."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        form="settings"
        label="Save changes"
        color="neutral"
        type="submit"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard variant="subtle">
      <UFormField
        name="name"
        label="Name"
        description="Will appear on receipts, invoices, and other communication."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="profile.name"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="email"
        label="Email"
        description="Used to sign in, for email receipts and product updates."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="profile.email"
          type="email"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="username"
        label="Username"
        description="Your unique username for logging in and your profile URL."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="profile.username"
          type="username"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="avatar"
        label="Avatar"
        description="JPG, GIF or PNG. 1MB Max."
        class="flex max-sm:flex-col justify-between sm:items-center gap-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          <UAvatar
            :src="profile.avatar"
            :alt="profile.name"
            size="lg"
          />
          <UButton
            label="Choose"
            color="neutral"
            @click="onFileClick"
          />
          <input
            ref="fileRef"
            type="file"
            class="hidden"
            accept=".jpg, .jpeg, .png, .gif"
            @change="onFileChange"
          >
        </div>
      </UFormField>
      <USeparator />
      <UFormField
        name="bio"
        label="Bio"
        description="Brief description for your profile. URLs are hyperlinked."
        class="flex max-sm:flex-col justify-between items-start gap-4"
        :ui="{ container: 'w-full' }"
      >
        <UTextarea
          v-model="profile.bio"
          :rows="5"
          autoresize
          class="w-full"
        />
      </UFormField>
    </UPageCard>
  </UForm>
</template>