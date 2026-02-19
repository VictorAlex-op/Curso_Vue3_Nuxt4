<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import type {LoginTypeSchema} from '#shared/zod/login.schema';
import {LoginSchema} from '#shared/zod/login.schema';
import type { NuxtError } from '#app';

const {fetch} = useUserSession();

const fields = ref<AuthFormField[]>([
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    required:true,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    required:true,
  }
])

const toast = useToast()

async function onSubmit(event:FormSubmitEvent<LoginTypeSchema>) {
    try {
        const res = await $fetch("/api/auth/login",{
          method:'POST',
          body:event.data,
        })
        console.log(res)
        await fetch();
        await navigateTo('/dashboard');
    } catch (error) {
      const err = error as NuxtError;
      toast.add({
        title:"Login Error",
        description:err.statusMessage || 'An error has occurred',
        color:"error",
      })
    }
}

</script>

<template>
  <div class="flex h-screen items-center justify-center bg-slate-100 p-4">
    <div class="w-full max-w-md bg-sky-950 p-8 rounded-xl shadow-lg border border-gray-100">
        <UAuthForm :schema="LoginSchema" @submit="onSubmit"
        title="Login":submit="{ label: 'Iniciar Sesión' }":fields="fields"class="space-y-4":ui="{title: 'text-white'}"/>
    </div>
  </div>
</template>
