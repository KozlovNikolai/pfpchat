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
import { useChatsStore } from 'src/stores/chat'
import { useCommonStore } from 'src/stores/common'
import { useUserStore } from 'src/stores/user'
import { Chat } from 'src/models/Chat'
import { useAuthStore } from 'src/stores/auth'

const chatsStore = useChatsStore()
const comStore = useCommonStore()
const userStore = useUserStore()
const auth = useAuthStore()

const chatName = (chat: Chat) => {
  if (chat.chat_type === 'private') {
    const parts = chat.name.split('_')
    if (Number(parts[0]) === auth.userId) {
      if (userStore.users.get(Number(parts[1])) === undefined) {
        userStore.reqGetUser({ profile: '', login: '', id: Number(parts[1]) })
      }
      return (
        userStore.users.get(Number(parts[1]))?.name +
        ' ' +
        userStore.users.get(Number(parts[1]))?.surname
      )
    } else {
      if (userStore.users.get(Number(parts[0])) === undefined) {
        userStore.reqGetUser({ profile: '', login: '', id: Number(parts[0]) })
      }
      return (
        userStore.users.get(Number(parts[0]))?.name +
        ' ' +
        userStore.users.get(Number(parts[0]))?.surname
      )
    }
  }

  return chat.name
}

const toChat = (id: number) => {
  chatsStore.currentChatID = id
  userStore.getChatUsers(id)
  chatsStore.getChatMessages({
    chatID: id,
    initMsgID: 0,
    before: 0,
    after: 1000,
  })
  comStore.moveTo('chat')
}
</script>

<style></style>
