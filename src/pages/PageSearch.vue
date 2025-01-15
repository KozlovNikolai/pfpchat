<template>
  <div>
    <q-input
      v-model="inputText"
      type="search"
      class="q-mb-md"
      outlined
      label="Введите текст для поиска"
      debounce="300"
    />

    <q-list
      class="user-list"
      @scroll="onScroll"
    >
      <q-item
        v-for="user in storeFind.users"
        :key="user.id"
        class="q-my-sm"
        clickable
        @click="onUserClick(user.id)"
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar
            color="primary"
            text-color="white"
          >
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name + ' ' + user.surname }}</q-item-label>
          <q-item-label
            caption
            lines="1"
            >{{ user.email }}</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-icon
            name="chat_bubble"
            :color="user.status == 'online' ? 'green' : 'grey'"
          />
        </q-item-section>
      </q-item>
      <q-item
        v-if="loading"
        class="loading-item"
      >
        <q-spinner />
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useUserFindStore } from 'src/stores/search'
import { useAuthStore } from 'src/stores/auth'
import { API_BASE_URL } from 'src/config/api'

const storeFind = useUserFindStore()
const inputText = ref('')
const loading = ref(false)

// Функция для загрузки пользователей
const loadUsers = async (search: string, start: number, stop: number) => {
  console.log('Загрузка пользователей...')
  loading.value = true
  console.log('loading: ', loading.value)
  try {
    const authStore = useAuthStore()
    const response = await axios.get(
      `${API_BASE_URL}/auth/getusers?search=${search}&start=${start}&stop=${stop}`,
      {
        headers: { Authorization: `Bearer ${authStore.getToken}` },
      }
    )
    storeFind.addUsers(response.data)
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error)
  } finally {
    loading.value = false
    console.log('loading: ', loading.value)
  }
}

// Обработчик изменения текста
const onInputChange = async () => {
  console.log('Изменение текста во вводе...')
  const search = inputText.value
  storeFind.clearUsers()
  await loadUsers(search, 0, 19)
}

// Обработчик прокрутки списка
const onScroll = async (event: Event) => {
  const target = event.target as HTMLElement
  if (
    target.scrollHeight - target.scrollTop <= target.clientHeight + 5 &&
    !loading.value
  ) {
    const currentLength = storeFind.users.length
    await loadUsers(inputText.value, currentLength, currentLength + 19)
  }
}

// Обработчик клика по пользователю
const onUserClick = (id: number) => {
  console.log('Выбран пользователь с ID:', id) // Здесь добавляем отладочный вывод
}

watch(inputText, () => {
  console.log('watch input text')
  onInputChange()
})

// Подписываемся на изменения в стейте
watch(
  () => storeFind.users,
  (newUsers) => {
    if (newUsers.length === 0) loadUsers('', 0, 19)
  },
  { immediate: true }
)
</script>

<style scoped>
.user-list {
  /* max-height: 300px; */
  overflow-y: auto;
}
.loading-item {
  text-align: center;
}
</style>
