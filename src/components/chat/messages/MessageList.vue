<template>
  <div class="col">
    <q-card
      class="fit ch_chat-card q-px-xs overflow-hidden q-mx-auto"
      flat
    >
      <q-virtual-scroll
        ref="scrollArea"
        component="q-list"
        :virtual-scroll-item-size="52"
        :items="messages"
        class="fit"
        @virtual-scroll="onVirtualScroll"
      >
        <template v-slot:before>
          <!-- <q-resize-observer @resize="onDown" /> -->
          <div
            class="col cursor-pointer ch_sticky-top q-mr-sm q-pa-xs ch_bg-grey_2 rounded-borders absolute-top ch_chat-card__scroller row items-center no-wrap justify-center"
            v-if="fabVisible"
            @click="onBottom"
          >
            <q-icon
              name="south"
              class="ch_text-dark"
            />
            <span class="font-black-normal-12-sm text-center"
              >{{ $t('Scroll back down') }}...</span
            >
          </div>
        </template>
        <template
          v-slot="{ item, index }: { item: ChatMessage, index: number }"
        >
          <q-item
            class="q-pa-none row items-center q-pb-sm"
            :ripple="false"
            :key="index"
          >
            <template v-if="ismymsg(item.sender_id)">
              <q-item-section>
                <q-item-label
                  class="self-end relative-position justify-end q-mr-xs q-ml-xl row font-black-normal-14-sm white-text ch_bg-teal_5 ch_message_attch_you overflow-hidden"
                >
                  <div class="q-mb-xs column q-mr-xs">
                    <div
                      v-html="item.text"
                      class="text-wrap space-normal"
                    />
                    <div class="absolute-bottom-right q-mr-xs q-mb-xs">
                      <q-icon
                        color="white"
                        size="11px"
                        class="q-ml-xs"
                        :name="item.is_deleted ? 'done_all' : 'done'"
                      />
                    </div>
                  </div>
                </q-item-label>
                <div class="self-end q-mr-xs font-black-normal-12-sm dark-text">
                  {{ item.created_at }}
                </div>
              </q-item-section>
              <q-btn
                round
                class="ch_bg-teal_5 q-mt-auto"
                padding="1px 1px"
                @click="joinUserProfile(item)"
              >
                <user-avatar
                  v-if="item.sender_id && userStore.getUserByID(item.sender_id)"
                  v-bind="{
                    item: userStore.getUserByID(item.sender_id) as ChatUser,
                    size: '40px',
                  }"
                />
              </q-btn>
            </template>

            <template v-else>
              <q-btn
                round
                class="ch_bg-teal_5 q-mr-xs q-mt-auto"
                padding="1px 1px"
                @click="joinUserProfile(item)"
              >
                <user-avatar
                  v-if="item.sender_id && userStore.getUserByID(item.sender_id)"
                  v-bind="{
                    item: userStore.getUserByID(item.sender_id)  as ChatUser,
                    size: '40px',
                  }"
                />
              </q-btn>

              <q-item-section>
                <q-item-label
                  class="ch_message_attch self-start ch_bg-teal_1 q-px-sm q-pt-sm q-mr-xl text-wrap overflow-hidden"
                >
                  <div
                    class="font-black-normal-14-sm q-mt-xs q-mb-xs row items-end justify-between"
                    v-html="item.text"
                  />
                </q-item-label>
                <div class="q-ml-xs row font-black-normal-12-sm text-left">
                  <div
                    class="ch_text_ellipsis q-mr-xs"
                    v-if="item.sender_id"
                  >
                    {{ userStore.getFullName(item.sender_id) }}
                  </div>
                  {{ item.created_at }}
                </div>
              </q-item-section>
            </template>
          </q-item>
        </template>
      </q-virtual-scroll>
    </q-card>
  </div>
  <chat-input
    v-model="message"
    @send="sendMessage"
    class="ch_chat_input"
  />
</template>

<script setup lang="ts">
import { ref, watch, PropType, Ref } from 'vue'
import { QVirtualScroll } from 'quasar'

import { ChatMessage } from 'src/models/ChatMessage'

import ChatInput from 'components/chat/ChatInput.vue'
import UserAvatar from 'src/components/user/UserAvatar.vue'
import { Chat } from 'src/models/Chat'
import { useChatsStoreSM } from 'src/stores/chat'
import { useUserStoreSM } from 'src/stores/user'
import { useAuthStoreSM } from 'src/stores/auth'
import { ChatUser } from 'src/models/ChatUser'
const authStore = useAuthStoreSM()
const newMessage: Ref<string> = ref('')
const props = defineProps({
  messages: {
    type: Array as PropType<ChatMessage[]>,
  },
  room: {
    type: Object as PropType<Chat>,
    required: true,
  },
})

const userStore = useUserStoreSM(),
  chatsStore = useChatsStoreSM(),
  // user = computed(() => userStore.getUserByID),
  scrollArea = ref(),
  fabVisible = ref(true),
  message = ref('')
// files = ref<File[]>([]);

// function updateFiles(e: File) {
//   files.value.push(e);
// }

// function getUserInRoom(sender: ChatUser) {
//   return props.room.getUserById(sender.id);
// }

// function getName(item: ChatMessage) {
//   if (!item.sender) return '';
//   const user = props.room.findUserInId(item.sender?.id);
//   if (!user) return '';

//   return `${user.name} ${user?.surname}`;
// }

// const sendChatMsg = async () => {
//   if (!message.value || !chatStore.getSocket) return;

//   const params = {
//     room: props.room,
//     user: user.value,
//     socket: chatStore.getSocket,
//     message: message.value,
//     files: files.value,
//   };
// let result;
//   if (props.room.users.length <= 2) {
//     const target_user = props.room.getOpponent;
//     if (!target_user) return;
//     [result] = messagesStore.sendChatMessage({
//       ...params,
//       target_user: target_user,
//     });
//     if (props.room.id === 'create_empty_room') {
//       await chatsStore.requestRooms({ user_id: user.value.id });
//       chatsStore.setRoomByTargetUser(target_user);
//     }
//   } else {
//     [result] = messagesStore.sendChatMessage(params);
//   }

//   if (result) {
//     files.value = [];
//     message.value = '';
//   }
// };
const sendMessage = () => {
  chatsStore.sendMessageToChat({
    chatID: chatsStore.currentChatID,
    text: newMessage.value,
    msgType: 'nop',
  })
  newMessage.value = ''
}

const ismymsg = (sender_id: number) => {
  if (sender_id === authStore.userId) {
    return true
  }
  return false
}

const onBottom = () => {
  onDown()
  fabVisible.value = false
}

const onVirtualScroll = (detail: {
  index: number
  from: number
  to: number
  direction: 'increase' | 'decrease'
  ref: QVirtualScroll
}) => {
  if (detail.ref && detail.ref.items) {
    fabVisible.value = detail.index <= detail.ref.items.length - 20
  }
}

function onDown() {
  if (!scrollArea.value) return
  scrollArea.value.refresh(props.messages?.length)
}

async function joinUserProfile(item: ChatMessage) {
  // if (item.sender) await userStore.getUserById(item.sender.id)
  console.log('join user profile:', item)
}

watch(props, onDown)
</script>
