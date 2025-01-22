<template>
  <RemoteApp
    :initialization-params="{
      Application: 'sputnik-monitor',
      token,
      currentUserChat: currentUserChat,
    }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RemoteApp from './RemoteApp.vue'
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNSwiZXhwIjoxNzM5OTY4NjYzLCJqdGkiOiIzOGI5NWVjZi03MzgyLTRlNmUtYTk3OS1mNTY0N2NlNGQ1NGUifQ.NZfKj5EqR1V8btSkz8XeXeIYiejrjlVC3WtZJX80AyY'

const currentUserChat = ref()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// (window as any).setUser = (id: number) => {
currentUserChat.value = { id: 123 }
// }
</script>
