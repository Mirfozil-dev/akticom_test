<script setup>
import { useClientsStore } from '@/stores/clients';
import FilterSelect from './FilterSelect.vue';
import SearchInput from './SearchInput.vue';

const store = useClientsStore()

function handleSearchInput(val) {
    store.setFetchParams({
        ...store.fetchParams,
        search: val
    })
}

function handleFilterSelect(key, val) {
    store.setFetchParams({
        ...store.fetchParams,
        [key]: val
    })
}

</script>

<template>
    <div class="filters">
        <SearchInput :value="store.fetchParams.search" @handle-search="val => handleSearchInput(val)" />
        <FilterSelect 
            :options="store.statuses"
            :value="store.fetchParams.status"
            @handle-change="val => handleFilterSelect('status', val)"
        />
        <button @click="store.loadClients()">Применить фильтры</button>
    </div>
</template>

<style scoped lang="scss">
.filters {
    display: flex;
    gap: 5px;
    padding: 10px;

    button {
        background: white;
        border: solid 1px;
        border-radius: 3px;
        cursor: pointer;
    }
}
</style>