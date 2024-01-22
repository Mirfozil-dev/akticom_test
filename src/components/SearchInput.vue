<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['value'])
const emit = defineEmits(['handleSearch'])
</script>

<template>
    <input :value="value" type="text" @input="e => $emit('handleSearch', e.target.value)" placeholder="Поиск...">
</template>


<style scoped>
input {
    padding: 3px 5px;
}
</style>