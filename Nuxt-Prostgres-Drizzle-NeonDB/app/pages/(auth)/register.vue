<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import type {RegisterTypeSchema} from '#shared/zod/register.schema';
import {RegisterSchema} from '#shared/zod/register.schema';
import type { NuxtError } from '#app';

const fields = ref<AuthFormField[]>([
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
  },
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
    required: true
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    required: true
  }  
])
const toast = useToast()

async function onSubmit(event:FormSubmitEvent<RegisterTypeSchema>) {
    try {
        const res = await $fetch("/api/auth/register",{
          method:'POST',
          body:event.data,
        })
        console.log(res)
    } catch (error) {
      const err = error as NuxtError;
      toast.add({
        title:"Register Error",
        description:err.statusMessage || 'An error has occurred',
        color:"error",
      })
    }
}

</script>

<template>
  <div class="flex h-screen items-center justify-center bg-slate-100 p-4">
    <div class="w-full max-w-md bg-sky-950 p-8 rounded-xl shadow-lg border border-gray-100">
        <UAuthForm :schema="RegisterSchema" @submit="onSubmit"
        title="Register" icon="mdi:account-box" :submit="{ label: 'Registrar usuario' }" :fields="fields" class="space-y-4" :ui="{title: 'text-white'}" />
    </div>
  </div>
</template>
