<template>
  <message-header-layout
    :room="currentRoom"
    :isMiniMode="cStore.getIsMiniMode"
  >
    <message-list v-bind="{ messages, room: currentRoom }" />
  </message-header-layout>
  <ch-loading :loading="isLoading" />
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue'

import { useChatsStoreSM } from 'src/stores/chat'
// import { useMessageStore } from 'src/stores/message/message';
// import { Chat } from 'src/models/Chat'

import MessageList from './MessageList.vue'
import MessageHeaderLayout from 'layouts/MessageHeaderLayout.vue'
import ChLoading from 'components/statuses/ChLoading.vue'
import { useCommonStoreSM } from 'src/stores/common'
import { Chat } from 'src/models/Chat'

defineEmits(['send_message', 'update:message', 'update:files'])
const cStore = useCommonStoreSM()
const chatStore = useChatsStoreSM()
// messagesStore = useMessageStore(),
// const  messages = computed(() => messagesStore.getChatMessages),
const messages = computed(
  () => chatStore.getChatByID(chatStore.currentChatID)?.messages
)
const isLoading = ref(false),
  currentRoom = computed(
    () => chatStore.getChatByID(chatStore.currentChatID) as Chat
  )

// async function onLoad(chat: Chat) {
//   if (!chat.id) return
//   isLoading.value = true
//   //if (chat.id === 'create_empty_room') return
//   await messagesStore.loadChatMessages(chat, true)
// }

function mount() {
  console.log('Message view called')
}

watch(
  currentRoom,
  // async (roomCR) => {
  //   messagesStore.reset()
  //   if (roomCR) {
  //     await onLoad(roomCR).finally(() => (isLoading.value = false))
  //     chatStore.setCacheRoom(roomCR)
  //   }
  // },
  (chatID) => {
    console.log('watch current chat:', chatID)
  },
  { immediate: true }
)
onMounted(mount())
//
// onUnmounted(() => messagesStore.reset())
</script>
