<script setup>
import {useCounterStore} from '@/store/counter'
import { storeToRefs } from 'pinia';
const useCounter = useCounterStore()


const {double,count} = storeToRefs(useCounter) // destructuracion
</script>

<template>
    <h1>Home counter: {{count }}</h1>
    <button @click="useCounter.increment">increment</button>
    <h2>Double: {{ double }}</h2>
</template>

<style>
</style>