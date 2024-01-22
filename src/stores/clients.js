import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GET_CLIENTS, POST_CLIENT, DELETE_CLIENT, PUT_CLIENT } from '@/api'

export const useClientsStore = defineStore('clients', () => {
  const clients = ref([])
  const isLoading = ref(false)
  const fetchParams = ref({
    search: ''
  })
  const statuses = [
    "Активен",
    "Неактивен",
    "Приостановлен"
  ]
  const clientFormData = ref({
    fullname: '',
    created_at: '',
    phone: '',
    region: '',
    status: ''
})
  async function loadClients() {
    try {
      isLoading.value = true
      // Изначально в переменной fetchParams хотел хранить значение полей поиска и фильтров и передовать обьект в параметры 
      // GET запроса, но потом обнаружил что фильтры в в выбранном мною mock api работают не корректно, 
      // поэтому передаю только значение поиска
      const res = await GET_CLIENTS({search: fetchParams.value.search})

      // Сделал фильтр в ручную так как в выбранном мною mock api фильтр работает не корректно
      if (Object.keys(fetchParams.value).some(key => key !== 'search')) {
        Object.entries(fetchParams.value).forEach(([key, value]) => {
          if (key !== 'search' && value !== '') res.data = res.data.filter(client => client[key] === value)
        })
      }
      clients.value = res.data
      isLoading.value = false
    } catch (e) {
      console.log(e)
    }
  }

  async function addClient() {
    if (clientFormData.value.fullname === ''
    && clientFormData.value.created_at === ''
    && clientFormData.value.phone === ''
    && clientFormData.value.region === ''
    && clientFormData.value.status === '') return

    try {
      isLoading.value = true
      const res = await POST_CLIENT(clientFormData.value)
      if (res.status === 201) {
        clients.value.push(res.data)
      }
      isLoading.value = false
    } catch (e) {
      console.log(e)
    }
    clientFormData.value = {
      fullname: '',
      created_at: '',
      phone: '',
      region: '',
      status: ''
    }
  }

  async function deleteClient(id) {
    try {
      isLoading.value = true
      await DELETE_CLIENT(id)
      clients.value = clients.value.filter(client => client.id !== id)
      isLoading.value = false
    } catch (e) {
      console.log(e)
    }
  }

  async function editClient(id, newVal) {
    try {
      isLoading.value = true
      await PUT_CLIENT(id, newVal)
      const i = clients.value.findIndex(client => client.id === id)
      clients.value[i] = newVal
      isLoading.value = false
    } catch (e) {
      console.log(e)
    }
  }

  function clientFormChange(key, val) {
    clientFormData.value[key] = val
  }

  function setFetchParams(newVal) {
    fetchParams.value = newVal
  }

  return { 
    clients, 
    isLoading, 
    statuses, 
    fetchParams,
    clientFormData,
    loadClients,
    editClient,
    setFetchParams,
    addClient,
    deleteClient,
    clientFormChange
  }
})
