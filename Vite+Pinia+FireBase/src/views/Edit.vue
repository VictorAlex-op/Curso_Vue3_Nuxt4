<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";

const route = useRoute();
const databaseStore = useDatabaseStore();
const url = ref("");

onMounted(async () => {
  url.value = await databaseStore.leerUrl(route.params.id);
});

const handleSubmit = async () => {
  await databaseStore.updateUrl(route.params.id, url.value);
};
</script>

<template>
  <a-row justify="center" style="margin-top: 60px;">
    <a-col :xs="24" :sm="20" :md="12" :lg="8">
      
      <a-card 
        title="Editar URL"
        :loading="databaseStore.loadingDoc"
        bordered
        style="border-radius: 12px;"
      >

        <a-form layout="vertical" @submit.prevent="handleSubmit">
          
          <a-form-item label="URL actual">
            <a-input v-model:value="url" placeholder="Ingrese nueva URL"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" block :loading="databaseStore.loadingDoc">
              Guardar cambios
            </a-button>
          </a-form-item>

        </a-form>

      </a-card>
    </a-col>
  </a-row>
</template>

