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
          <q-item-label>{{ chat.name }}</q-item-label>
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

const chatsStore = useChatsStore()
const comStore = useCommonStore()
const userStore = useUserStore()

const toChat = (id: number) => {
  chatsStore.currentChatID = id
  userStore.getChatUsers(id)
  comStore.moveTo('chat')
}
</script>

<style></style>
