<template>
  <q-page>
    <q-banner class="bg-grey-4 text-center"> {{}} </q-banner>
    <div class="chat">
      <div
        class="message-list"
        ref="messageList"
      >
        <q-chat-message
          v-for="message in chatsStore.getChatByID(chatsStore.currentChatID)
            ?.messages"
          :key="message.id"
          :name="
            message.sender_id != authStore.userId
              ? userStore.users.get(message.sender_id)?.name
              : 'Me'
          "
          :text="[message.text]"
          :sent="message.sender_id == authStore.userId ? true : false"
        />
      </div>
      <q-footer elevated>
        <q-toolbar>
          <q-form class="full-width">
            <q-input
              v-model="newMessage"
              @keyup.enter="sendMessage"
              bg-color="white"
              outlined
              rounded
              label="Message"
              dense
            >
              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  @click="sendMessage"
                  color="white"
                  icon="send"
                />
              </template>
            </q-input>
          </q-form>
        </q-toolbar>
      </q-footer>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useChatsStore } from 'src/stores/chat'
import { useUserStore } from 'src/stores/user'
import { useAuthStore } from 'src/stores/auth'
// import { Chat } from 'src/models/Chat'

const chatsStore = useChatsStore()
const userStore = useUserStore()
const authStore = useAuthStore()

// const virtualListRef = ref<VNodeRef | null>(null)
// const virtualListIndex = ref<number>(15)

// onMounted(() => {
//   virtualListRef.value.scrollTo(virtualListIndex.value)
// })

// const chatName = (chat: Chat) => {
//   if (chat.chat_type === 'private') {
//     const parts = chat.name.split('_')
//     if (Number(parts[0]) === authStore.userId) {
//       if (userStore.users.get(Number(parts[1])) === undefined) {
//         userStore.reqGetUser({ profile: '', login: '', id: Number(parts[1]) })
//       }
//       return (
//         userStore.users.get(Number(parts[1]))?.name +
//         ' ' +
//         userStore.users.get(Number(parts[1]))?.surname
//       )
//     } else {
//       if (userStore.users.get(Number(parts[0])) === undefined) {
//         userStore.reqGetUser({ profile: '', login: '', id: Number(parts[0]) })
//       }
//       return (
//         userStore.users.get(Number(parts[0]))?.name +
//         ' ' +
//         userStore.users.get(Number(parts[0]))?.surname
//       )
//     }
//   }
// }
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
