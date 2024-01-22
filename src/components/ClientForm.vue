<script setup>
import { useClientsStore } from '@/stores/clients';

const store = useClientsStore()

</script>

<template>
    <div class="client_form" tabindex="0" @keypress.enter="store.addClient()">
        <input 
            @input="e => store.clientFormChange('fullname', e.target.value)" 
            :value="store.clientFormData.fullname" type="text" placeholder="ФИО"
        >
        <input
            @input="e => store.clientFormChange('created_at', e.target.value)" 
            :value="store.clientFormData.created_at" type="date" placeholder="Дата создания"
        >
        <input 
            @input="e => store.clientFormChange('phone', e.target.value)" 
            :value="store.clientFormData.phone" type="text" placeholder="Номер телефона"
        >
        <input
            @input="e => store.clientFormChange('region', e.target.value)" 
            :value="store.clientFormData.region" type="text" placeholder="Регион"
        >
        <select
            @input="e => store.clientFormChange('status', e.target.value)" 
            :value="store.clientFormData.status"
        >
            <option v-for="status in store.statuses" :value="status">{{ status }}</option>
        </select>
        <button @click="store.addClient()">Добавить</button>
    </div>
</template>


<style scoped lang="scss">
.client_form {
    display: flex;
    justify-content: space-around;
    padding: 10px;

    input, select, button {
        width: 15%;
        padding: 3px 5px;
    }
    button {
        background: white;
        border: solid 1px;
        border-radius: 3px;
        cursor: pointer;
    }
}
</style>