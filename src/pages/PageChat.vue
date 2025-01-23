<template ref="pageRef">
  <q-page ref="listContainerRef">
    <q-banner class="bg-grey-4 text-center"> {{ chatName() }} </q-banner>
    <div class="chat">
      <div class="message-list">
        <q-virtual-scroll
          ref="virtualListRef"
          :style="`max-height: ${containerHeight}px`"
          :items="messages"
          separator
          v-slot="{ item, index }"
          @virtual-scroll="onVirtualScroll"
        >
          <q-chat-message
            :key="index"
            :name="
              item.sender_id != authStore.userId
                ? userStore.users.get(item.sender_id)?.name
                : 'Me'
            "
            :text="[item.text]"
            :sent="item.sender_id == authStore.userId ? true : false"
          />
        </q-virtual-scroll>
      </div>
    </div>
    <q-footer>
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
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { useChatsStoreSM } from 'src/stores/chat'
import { useUserStoreSM } from 'src/stores/user'
import { useAuthStoreSM } from 'src/stores/auth'
import { Chat } from 'src/models/Chat'

const containerHeight = ref(600)

const auth = useAuthStoreSM()
// const messageList = ref()
const chatsStore = useChatsStoreSM()
const userStore = useUserStoreSM()
const authStore = useAuthStoreSM()
// const scrollArea = ref()
const messages = computed(() => {
  return chatsStore.getChatByID(chatsStore.currentChatID)?.messages || []
})
const virtualListRef = ref()
const listContainerRef = ref()
const pageRef = ref()
const virtualListIndex = ref(1200)
const newMessage: Ref<string> = ref('')
const sendMessage = () => {
  chatsStore.sendMessageToChat({
    chatID: chatsStore.currentChatID,
    text: newMessage.value,
    msgType: 'nop',
  })
  newMessage.value = ''
}
const chatName = () => {
  const chat = chatsStore.getChatByID(chatsStore.currentChatID) as Chat
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

const onVirtualScroll = (data: { index: number }) => {
  virtualListIndex.value = data.index
  console.log('virt scroll events:', data)
}

const isLastIndexNotVisible = () =>
  virtualListIndex.value < messages.value.length - 1

watch(
  () => messages.value.length,
  () => {
    if (!virtualListRef.value || isLastIndexNotVisible()) return
    virtualListRef.value.refresh(messages.value.length - 1)
  }
)

watch(
  () => listContainerRef.value?.$el.scrollHeight,
  (val) => {
    containerHeight.value = val
  }
)

onMounted(() => {
  // containerHeight.value = listContainerRef.value.scrollHeight

  if (!virtualListRef.value) return
  virtualListRef.value.refresh(messages.value.length - 1)
  console.log('virtualListRef:', virtualListRef.value)
  console.log('listContainerRef:', listContainerRef.value.$el.scrollHeight)
  console.log('pageRef:', pageRef.value)
})
</script>

<style>
.chat {
  /* max-height: 600px;
  overflow-y: auto;
  height: 100%; */
}
.message-list {
  /* height: 100%; */
  /* padding: 10px;  */
}
</style>
