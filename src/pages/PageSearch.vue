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
  </div>
  <div
    @scroll="onScroll"
    style="height: 500px; overflow-y: auto; border: 1px solid #ccc"
  >
    <q-list class="user-list">
      <q-item
        v-for="user in storeFind.users"
        :key="user.id"
        class="q-my-sm"
        clickable
        @click="
          () => {
            toPrivateChat(user.id)
          }
        "
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
import axios, { AxiosError } from 'axios'
import { useUserFindStore } from 'src/stores/search'
import { useAuthStore } from 'src/stores/auth'
import { API_BASE_URL } from 'src/config/api'
import { useChatsStore } from 'src/stores/chat'
import { useUserStore } from 'src/stores/user'
import { useCommonStore } from 'src/stores/common'

const userStore = useUserStore()
const chatsStore = useChatsStore()
const storeFind = useUserFindStore()
const inputText = ref('')
const loading = ref(false)
const comStore = useCommonStore()
const authStore = useAuthStore()

// Функция для загрузки пользователей
const loadUsers = async (search: string, start: number, stop: number) => {
  console.log('Загрузка пользователей...')
  loading.value = true
  console.log('loading: ', loading.value)
  try {
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

const toPrivateChat = (id: number) => {
  let privateChatName: string = ''
  if (id > authStore.getUser.userId) {
    privateChatName = authStore.getUser.userId + '_' + id
  } else {
    privateChatName = id + '_' + authStore.getUser.userId
  }

  let pchat = chatsStore.getChatByName(privateChatName)
  if (pchat === undefined) {
    chatsStore
      .createPrivateChat({ user_two_id: id })
      .catch((e: AxiosError) => {
        console.log(e)
      })
      .then(() => {
        chatsStore.getChats()
        pchat = chatsStore.getChatByName(privateChatName)
        if (pchat === undefined) {
          console.error('не удалось создать приватный чат')
        } else {
          chatsStore.currentChatID = pchat.id
        }
      })
  } else {
    chatsStore.currentChatID = pchat.id
  }

  userStore.getChatUsers(id)
  chatsStore.getChatMessages({
    chatID: id,
    initMsgID: 0,
    before: 0,
    after: 1000,
  })
  comStore.moveTo('chat')
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
