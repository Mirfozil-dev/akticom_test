<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['options', 'value'])
const emit = defineEmits(['handleChange'])

function handleFilterSelect(e) {
    emit('handleChange', e.target.value)
}
</script>

<template>
    <select @change="e => handleFilterSelect(e)" :value="value">
        <option value="">Не выбрано</option>
        <option v-for="option in options" :value="option">{{ option }}</option>
    </select>
</template>

<style scoped>
select {
    padding: 2px 5px;
}
</style>