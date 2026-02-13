<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import { useDatabaseStore } from '../stores/database';
import { useUserStore } from '../stores/userStore';
const database = useDatabaseStore()
const user = useUserStore()
const router = useRouter();
const url = ref('')

const handleSubmit = async() => {
    if (!url.value) return
    await database.addUrl(url.value)
    url.value = ''
}

onBeforeMount(async() => {
    await user.currentUser()
    await database.getUrls()
})
</script>

<template>
    <div style="padding: 12px;">
        <a-page-header style="border: 1px solid rgb(235, 237, 240); margin: 10px;" title="Home"></a-page-header>
    </div>

    <div style="padding: 24px;">
        <a-form layout="inline" @submit.prevent="handleSubmit">
            <a-form-item>
                <a-input type="text" placeholder="Ingrese URL" v-model:value="url" />
            </a-form-item>
            <a-form-item>
                <a-button html-type="submit" type="primary">Agregar</a-button>
            </a-form-item>
        </a-form>
    </div>
    
    <p v-if="database.loadingDoc">Loading docs.....</p>
    <div style="background-color: #ececec; padding: 20px; margin-top: 20px;" v-else >
        <a-row :gutter="16">
            <a-col v-for="item of database.documents":key='item.id' :span="8" >
                <a-card :title="item.doc.name" style="margin-top: 20px;" :bordered="false">
                    <p>{{ item.id }}</p>
                    <br>
                    <p>{{ item.doc.short }}</p>
                    <div>
                        <a-button style="margin-right: 10px;" @click="database.deleteUrl(item.id)" :disabled="database.loadingDoc" type="primary" danger>
                            Eliminar
                        </a-button>
                        <a-button @click="router.push(`/editar/${item.id}`)" type="primary">
                            Editar
                        </a-button>
                    </div>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

