<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
const router = useRouter()
const toast = useToast()

async function logout() {
  try {
    await $fetch('/api/auth/logout', {
      method: 'GET'
    })
    toast.add({
      title: 'Session closed',
      description: 'See you soon 👋',
      icon: 'i-lucide-log-out',
      color: 'neutral'
    })
    await router.push('/login')
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Could not close session.',
      icon: 'i-lucide-x',
      color: 'error'
    })
  }
}



const items: NavigationMenuItem[] = [
  {
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/dashboard'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    to: '/dashboard/settings'
  }
]

const {data:profile, error} = await useFetch('/api/user/profile')

</script>

<template>
  <UDashboardGroup class="min-h-screen">

    <!-- SIDEBAR -->
    <UDashboardSidebar
      collapsible
      class="flex flex-col"
    >
      <!-- HEADER -->
      <template #header="{ collapsed }">
        <div class="flex items-center gap-3 p-2">
          <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500 shadow-md">
            <img 
              src="https://i.pinimg.com/736x/3e/7e/99/3e7e992334c6a4442358a3226ffe5f6d.jpg"
              alt="Logo"
              class="w-full h-full object-cover"
            />
          </div>
          <span v-if="!collapsed" class="font-semibold">
            Dashboard
          </span>
        </div>
      </template>

      <!-- MENU -->
      <div class="flex-1">
        <UNavigationMenu
          :items="items"
          orientation="vertical"
        />
      </div>

      <!-- FOOTER (perfil abajo fijo) -->
      <template #footer="{ collapsed }">
  <div class="p-2 flex flex-col gap-2">

    <!-- Usuario -->
    <UButton
      :avatar="{ src: profile?.avatar || '' }"
      color="neutral"
      variant="ghost"
      class="w-full justify-start"
      :block="collapsed"
    >
      <div
        v-if="!collapsed"
        class="max-w-[140px] truncate text-sm font-medium"
      >
        {{ profile?.username }}
      </div>
    </UButton>

    <USeparator />

    <!-- Logout -->
    <UButton
      icon="i-lucide-log-out"
      color="neutral"
      variant="ghost"
      class="w-full justify-start text-red-500 hover:text-red-600"
      :block="collapsed"
      @click="logout"
    >
        <span v-if="!collapsed">Logout</span>
        </UButton>

      </div>
    </template>


    </UDashboardSidebar>

    <!-- PANEL PRINCIPAL -->
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Dashboard" />
      </template>

      <div class="p-6">
        <slot />
      </div>
    </UDashboardPanel>

  </UDashboardGroup>
</template>
