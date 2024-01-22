<script setup>
import { useClientsStore } from '@/stores/clients';
import { formatDate } from '@/services'
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const store = useClientsStore();

const editingClient = ref({})

function handleEdit(client) {
    editingClient.value = client
}

function cancelEdit() {
    editingClient.value = {}
}

</script>

<template>
    <table border="1" class="clients_table">
        <thead>
            <tr>
                <th>ID</th>
                <th>ФИО</th>
                <th>Дата создания</th>
                <th>Номер Телефона</th>
                <th>Регион</th>
                <th>Статус</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="client in store.clients" :key="client.id">
                <template v-if="Object.keys(editingClient).length > 0 && editingClient.id === client.id">
                    <td>
                        {{ client.id }}
                    </td>
                    <td>
                        <input type="text" v-model="editingClient.fullname">
                    </td>
                    <td>
                        <input type="date" v-model="editingClient.created_at">
                    </td>
                    <td>
                        <input type="text" v-model="editingClient.phone">
                    </td>
                    <td>
                        <input type="text" v-model="editingClient.region">
                    </td>
                    <td>
                        <select
                            v-model="editingClient.status"
                        >
                            <option v-for="status in store.statuses" :value="status">{{ status }}</option>
                        </select>
                    </td>
                    <td>
                        <div class="table_actions">
                            <button @click="store.editClient(editingClient.id, editingClient)">
                                <font-awesome-icon icon="fa-solid fa-check" />
                            </button>
                            <button @click="cancelEdit()">
                                <font-awesome-icon icon="fa-solid fa-xmark" />
                            </button>
                        </div>
                        
                    </td>
                </template>
                <template v-else>
                    <td>
                        {{ client.id }}
                    </td>
                    <td class="client_name">
                        <RouterLink :to="`/client/${client.id}`">
                            {{ client.fullname }}
                        </RouterLink>
                    </td>
                    <td>{{ formatDate(client.created_at) }}</td>
                    <td>{{ client.phone }}</td>
                    <td>{{ client.region }}</td>
                    <td>{{ client.status }}</td>
                    <td>
                        <div class="table_actions">
                            <button @click="store.deleteClient(client.id)">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                            </button>
                            <button @click="handleEdit(client)">
                                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                            </button>
                        </div>
                    </td>
                </template>
            </tr>
        </tbody>
    </table>
</template>

<style scoped lang="scss">
.clients_table {
    width: 100%;
    border-collapse: collapse;

    td, th{
        padding: 10px;
        text-align: center;


        .table_actions {
            display: flex;
            justify-content: center;
            gap: 10px;

            .svg-inline--fa {
                color: #2185D5;
            }
        }

        &.client_name {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        a {
            color: black;
        }

        input, select {
            width: 80%;
            padding: 3px 5px;
        }
    }
}
</style>