<script setup>
import ClientsTable from '@/components/ClientsTable.vue';
import ClientForm from '@/components/ClientForm.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useClientsStore } from '@/stores/clients';
import { onMounted } from 'vue';
import Filters from '@/components/Filters.vue';

const store = useClientsStore();

onMounted(async () => {
  await store.loadClients();
})


</script>

<template>
  <Transition name="fade">
    <div v-if="store.isLoading" class="loader">
      <img
        src="@/assets/images/Rocket.gif"
      />
    </div>
    <main v-else>
      <div class="left-side">
        <Sidebar />
      </div>
      <div class="right-side">
        <Filters />
        <ClientsTable/>
        <ClientForm />
      </div>
    </main>
  </Transition>
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  padding: 20px;
  .left-side {
    width: 20%;
    height: 100%;
    background: #F3F3F3;
    border-radius: 6px;
    padding: 10px;
  }
  .right-side {
    width: 80%;
    height: 85vh;
    overflow-y: scroll;
    background: #F3F3F3;
    border-radius: 6px;
    padding: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}
</style>
