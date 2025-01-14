<template>
  <q-page class="flex q-pa-md">
    <q-list
      class="full-width"
      separator
    >
      <q-item
        v-for="chat in chatsStore.chatsArray"
        :key="chat.id"
        clickable
        v-ripple
        @click="() => toChat(chat.id)"
      >
        <q-item-section avatar>
          <q-avatar
            color="primary"
            text-color="white"
          >
            {{ chat.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>ID:{{ chat.id }}</q-item-label>
          <q-item-label>{{ chatName(chat) }}</q-item-label>
          <q-item-label>{{ chat.chat_type }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useChatsStore } from 'src/stores/chat'
import { useUserStore } from 'src/stores/user'
import { useAuthStore } from 'src/stores/auth'

const chatsStore = useChatsStore()
const userStore = useUserStore()
const authStore = useAuthStore()

// const virtualListRef = ref<VNodeRef | null>(null)
// const virtualListIndex = ref<number>(15)

// onMounted(() => {
//   virtualListRef.value.scrollTo(virtualListIndex.value)
// })

const newMessage: Ref<string> = ref('')
const sendMessage = () => {
  chatsStore.sendMessageToChat({
    chatID: chatsStore.currentChatID,
    text: newMessage.value,
    msgType: 'nop',
  })
  newMessage.value = ''
}
</script>

<style>
.chat {
  height: 1000px; /* Задайте нужную высоту */
  overflow-y: auto; /* Поддержка прокрутки */
}
.message-list {
  padding: 10px; /* Настройки отступов */
}
</style>
