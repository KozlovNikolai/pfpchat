<template>
  <q-page>
    <div>
      <q-virtual-scroll
        ref="virtualListRef"
        style="max-height: 300px"
        component="q-list"
        :items="chatsStore.getterChat(chatsStore.currentChatID)?.messages"
        separator
        @virtual-scroll="onVirtualScroll"
        v-slot="{ item, index }"
      >
        <q-item
          dense
          :class="{ 'bg-black text-white': index === virtualListIndex }"
        >
          <q-item-section>
            <q-item-label>
              #{{ userStore.getUserByID(item.sender_id)?.name }} -
              {{ item.text }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />
      </q-virtual-scroll>
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
import { Ref, ref, onMounted, VNodeRef } from 'vue'
import { useChatsStore } from 'src/stores/chat'
import { useUserStore } from 'src/stores/user'
// import { useAuthStore } from 'src/stores/auth'

const chatsStore = useChatsStore()
const userStore = useUserStore()
// const authStore = useAuthStore()

const virtualListRef = ref<VNodeRef | null>(null)
const virtualListIndex = ref<number>(15)

onMounted(() => {
  virtualListRef.value.scrollTo(virtualListIndex.value)
})

const onVirtualScroll = ({ index }: { index: number }) => {
  virtualListIndex.value = index
  console.log('INDEX = ', index)
}

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

<style></style>
