<template>
  <q-page class="flex q-pa-md">
    <q-list
      class="full-width"
      separator
    >
      <q-item
        v-for="chat in store.chatsArray"
        :key="chat.id"
        to="/chat"
        clickable
        v-ripple
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
import { onBeforeMount } from 'vue'
import { useChatsStore } from 'src/stores/chat'
// import { Chat } from 'src/models/Chat'
const store = useChatsStore()

// const chats: Chat[] = store.chatsArray as Chat[]
// const chats = ref(store.chatsArray)

onBeforeMount(() => {})
// console.log('chats: ', chats.value.length)
</script>

<style></style>
<!--
<q-item-section side>
  <q-badge :color="chat.online ? 'light-green-5' : 'grey-4'">
    {{ chat.online ? 'Online' : 'Offline' }}
  </q-badge>
</q-item-section> -->
