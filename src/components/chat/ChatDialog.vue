<template>
  <cmp-dialog
    v-model="isVisible"
    @hide="hide"
    ref="cmp_dialog"
    align-items="center"
    :seamless="false"
    :persistent="true"
    @update:sizes="cStore.updateDialogSize"
  >
    <template #aside>
      <!-- <support-folders /> -->
    </template>

    <template #header>
      <header-chat
        v-bind="{
          chat,
        }"
      />
    </template>
    <template #body>
      <dialog-body-layout class="row">
        <q-splitter
          class="fit row hodden"
          v-model="splitterModel"
          dark
          :disable="isMiniMode"
          :limits="!isMiniMode ? [30, 50] : [0, 100]"
        >
          <template v-slot:before>
            <chat-card
              v-if="!isMiniMode"
              class="col ch_rooms_view"
              @open_chat="joinSelectedRoom"
            />
          </template>
          <template v-slot:after>
            <div
              class="fit col"
              :class="[isMiniMode ? '' : 'ch_border-left-grey-2']"
            >
              <!-- <component :is="routing[cStore.path]" /> -->
              <component :is="routing[cStore.path]" />
            </div>
          </template>
        </q-splitter>
      </dialog-body-layout>
    </template>

    <template #right-aside>
      <user-info-card class="col-3 ch_border-left-grey" />
    </template>
  </cmp-dialog>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch, defineAsyncComponent } from 'vue'

import CmpDialog from 'src/components/common/CmpDialog.vue'
import HeaderChat from 'components/chat/Headers/HeaderChat.vue'
import UserInfoCard from 'components/user/UserInfoCard.vue'
import DialogBodyLayout from 'src/layouts/DialogBodyLayout.vue'
import ChatCard from 'components/chat/ChatCard/ChatCard.vue'
import { type Path, useCommonStoreSM } from 'src/stores/common'
import { useChatsStoreSM } from 'src/stores/chat'
import { useUserStoreSM } from 'src/stores/user'
import { Chat } from 'src/models/Chat'
const chatsStore = useChatsStoreSM()
const userStore = useUserStoreSM()
const cStore = useCommonStoreSM()
const emit = defineEmits(['hide'])

const props = defineProps({
  showCallback: Function,
  hideCallback: Function,
})

const isVisible = ref(false),
  cmp_dialog = ref(),
  isMiniMode = computed(() => cStore.getIsMiniMode),
  splitterModel = ref(0),
  chat = computed(
    () => chatsStore.getChatByID(chatsStore.currentChatID) as Chat
  )

const routing: { [key in Path]: ReturnType<typeof defineAsyncComponent> } = {
  chat: defineAsyncComponent(
    () => import('components/chat/messages/Messages_view.vue')
  ),
  auth: defineAsyncComponent(
    () => import('components/chat/messages/Messages_view.vue')
  ),
  start: defineAsyncComponent(
    () => import('components/chat/messages/Messages_view.vue')
  ),
  scroll: defineAsyncComponent(
    () => import('components/chat/messages/Messages_view.vue')
  ),
  search: defineAsyncComponent(
    () => import('components/chat/messages/Messages_view.vue')
  ),
}

const show = () => {
  props.showCallback?.()
  isVisible.value = !isVisible.value
}

const hide = () => {
  props.hideCallback?.()
  isVisible.value = false
  emit('hide')
}
// const joinSelectedRoom = async (room: ChatRoom) => {
//   if (room) {
//     store.setChatType('messages');
//     currentRoom.value = room as ChatRoom;
//   }
// };
const joinSelectedRoom = async (chat: Chat) => {
  console.log('joinSelecetdRoom is pressed:', chat.id)
  chatsStore.currentChatID = chat.id
  userStore.getChatUsers(chat.id).then(() => {
    chatsStore
      .getChatMessages({
        chatID: chat.id,
        initMsgID: 0,
        before: 0,
        after: 1000,
      })
      .then(() => {
        cStore.moveTo('chat')
      })
  })
}

watch(isMiniMode, () => {
  if (isMiniMode.value) splitterModel.value = 0
  else splitterModel.value = 45
})

defineExpose({ show })
onMounted(() => {
  cmp_dialog.value.show('center')
})
</script>
<style lang="scss">
.search_item {
  min-height: auto;
}
</style>
