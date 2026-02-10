<script setup>
import {useUserStore} from '../stores/userStore'
import {ref} from 'vue'
import router from "../router.js"

const userStore = useUserStore()
const email = ref('')
const password = ref('')


const handleSubmit = async() => {
    if(!email.value || !password.value || password.value < 6){
        return alert('Basura llena otra vez los datos')
    }
    await userStore.LoginUser(email.value,password.value)
    router.push('/')
}

</script>


<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" name="" id="" placeholder="Ingrese email" v-model.trim="email">
            <input type="password" name="" id="" placeholder="Ingrese contraseña" v-model.trim="password">
            <button :disabled="userStore.loadingUser">Login</button>
        </form>
    </div>





</template>

