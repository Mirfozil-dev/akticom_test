<script setup>
import { useRoute } from 'vue-router' 
import { GET_CLIENT_BY_ID } from '@/api'
import { onMounted, ref } from 'vue';
import { formatDate } from '@/services';

const isLoading = ref(false)
const client = ref({})

onMounted(async () => {
  const route = useRoute()
  const id = route.params.id

  isLoading.value = true
  const res = await GET_CLIENT_BY_ID(id)
  client.value = res.data
  isLoading.value = false
})
</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loader">
      <img
        src="@/assets/images/Rocket.gif"
      />
    </div>
    <div class="client_card" v-else>
      <h1>{{ client.fullname }}</h1>
      <p>Информация о клиенте</p>
      <p>Номер телефона: {{ client.phone }}</p>
      <p>Регион: {{ client.region }}</p>
      <p>Статус: {{ client.status }}</p>
      <p>Дата создания: {{ formatDate(client.created_at) }}</p>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.client_card {
  background: #F3F3F3;
  border-radius: 6px;
  padding: 10px 20px;
  margin: 20px 10px;
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
