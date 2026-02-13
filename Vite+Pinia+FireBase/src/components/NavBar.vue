<script setup>
import {h,ref} from 'vue'
import { HomeFilled ,LogoutOutlined,UserOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '../stores/userStore'
import router from '../router'


const user = useUserStore()
const current = ref(['home'])
const items = ref([
    {
        key:'home',
        icon: () => h(HomeFilled),
        label: 'Home',
        title: 'Home',
        router: () => router.push('/')
    },
    {
        key:'perfil',
        icon: () => h(UserOutlined),
        label: 'perfil',
        title: 'Perfil',
        router: () => router.push('/perfil')
    },
    {
        key:'logout',
        icon: () => h(LogoutOutlined),
        label: 'logout',
        title: 'logout',
        style: { marginLeft: 'auto' }
    }
])

const handleLogout = ({key}) => {
    if (key === 'logout') {
        user.Logout()
    } else {
        router.push(key === 'home' ? '/' : `/${key}`)
    }
}

</script>

<template>
    <a-layout class="layout">
        <a-layout-header>
            <div class="logo"></div>
            <a-menu v-model:selectedKeys="current" theme="dark" mode="horizontal" :items="items" @click="handleLogout"/>
        </a-layout-header>
    </a-layout>
</template>
