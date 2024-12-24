<template>
  <div></div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import { useChatsStore } from 'src/stores/chat'
// import { useUserStore } from 'src/stores/user'

// const chatStore = useChatsStore()
// const userStore = useUserStore()
// const newMessage = ref('')

// const connectToChat = () => {
//   const token = userStore.token
//   chatStore.connectToChat(token)
// }

// const disconnectFromChat = () => {
//   chatStore.disconnectFromChat()
// }

// const sendMessage = () => {
//   if (newMessage.value.trim()) {
//     chatStore.sendMessage(newMessage.value)
//     newMessage.value = ''
//   }
// }

// const messages = chatStore.messages
</script>

<style>
.message {
  margin-bottom: 10px;
}
</style>

<!--
<q-btn
color="primary"
label="Подключиться"
@click="connectToChat"
/>
<q-btn
color="negative"
label="Отключиться"
@click="disconnectFromChat"
/>

<div
v-for="message in messages"
:key="message.id"
class="message"
>
<p>
  <b>{{ message.senderName }}:</b> {{ message.content }}
</p>
</div>

<q-input
v-model="newMessage"
placeholder="Введите сообщение"
@keyup.enter="sendMessage"
/> -->
