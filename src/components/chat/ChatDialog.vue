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
      <!-- <header-chat
        v-bind="{
          currentRoom,
          chatType: store.getChatType,
        }"
      /> -->
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
              My messages
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
import { computed, ref, onMounted, watch } from 'vue'

import CmpDialog from 'src/components/common/CmpDialog.vue'
// import HeaderChat from 'components/chat/Headers/HeaderChat.vue'
import UserInfoCard from 'components/user/UserInfoCard.vue'
// import SupportFolders from 'components/folders/folder/SupportFolders.vue'
import DialogBodyLayout from 'src/layouts/DialogBodyLayout.vue'
import ChatCard from 'components/chat/ChatCard/ChatCard.vue'
// import StartPage from 'src/pages/PageStart.vue'
// import { ChatRoom } from 'src/models/chat/room';
// import UsePageStart from 'src/pages/PageStart.vue'
// import PageChat from 'src/pages/PageChat.vue'
import { useCommonStoreSM } from 'src/stores/common'
import { useChatsStoreSM } from 'src/stores/chat'
import { useUserStoreSM } from 'src/stores/user'
import { Chat } from 'src/models/Chat'
// import MsgPg from 'components/chat/messages/Messages_view.vue'
const chatsStore = useChatsStoreSM()
const userStore = useUserStoreSM()
// import { useChatStore, ChatTypes } from 'src/stores/chat'
const cStore = useCommonStoreSM()
const emit = defineEmits(['hide'])
// store = useChatStore()

const props = defineProps({
  showCallback: Function,
  hideCallback: Function,
})

const isVisible = ref(false),
  cmp_dialog = ref(),
  isMiniMode = computed(() => cStore.getIsMiniMode),
  // path = computed(() => cStore.getPath),
  // rooms = computed(() => store.rooms as ChatRoom[]),
  // rooms = UsePageStart(),
  splitterModel = ref(0)
// currentRoom = computed({
//   get: () => store.getCurrentRoom,
//   set: (room) => {
//     store.setCurrentRoom(room)
//   },
// }),

// const routing: { [key in Path]: ReturnType<typeof defineAsyncComponent> } = {
//   chat: defineAsyncComponent(
//     () => import('components/chat/messages/Messages_view.vue')
//   ),
//   auth: defineAsyncComponent(
//     () => import('components/messages/Messages_view.vue')
//   ),
//   start: defineAsyncComponent(
//     () => import('components/messages/Messages_view.vue')
//   ),
//   scroll: defineAsyncComponent(
//     () => import('components/messages/Messages_view.vue')
//   ),
//   search: defineAsyncComponent(
//     () => import('components/messages/Messages_view.vue')
//   ),
// }
// routing: { [key in ChatTypes]: ReturnType<typeof defineAsyncComponent> } = {
//   create_group: defineAsyncComponent(
//     () => import('components/group/created/Create_group_view.vue')
//   ),
//   rooms: defineAsyncComponent(
//     () => import('components/rooms/Rooms_view.vue')
//   ),
//   messages: defineAsyncComponent(
//     () => import('components/messages/Messages_view.vue')
//   ),
//   folders: defineAsyncComponent(
//     () => import('components/folders/editFolders/Folders_view.vue')
//   ),
//   contacts: defineAsyncComponent(
//     () => import('components/contacts/Contacts_view.vue')
//   ),
// }

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
//     store.setChatType('messages')
//     currentRoom.value = room as ChatRoom
//   }
// }

const joinSelectedRoom = (chat: Chat) => {
  console.log('joinSelecetdRoom is pressed:', chat.id)
  chatsStore.currentChatID = chat.id
  userStore.getChatUsers(chat.id)
  chatsStore.getChatMessages({
    chatID: chat.id,
    initMsgID: 0,
    before: 0,
    after: 1000,
  })
  cStore.moveTo('chat')
}

// watch(
//   dialogSize,
//   debounce((nv: sizeWindowParams) => {
//     console.log(nv, 'newValue');
//     if (nv.width > 900) cmp_dialog.value.show('center');
//   }, 300),
//   { deep: true },
// );

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
