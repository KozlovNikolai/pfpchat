<template>
  <q-item
    clickable
    v-ripple
    square
    dense
    class="full-width q-pa-xs no-shadow ch_card_item-chat"
    @click="$emit('open_chat', item)"
    :active="true"
    active-class="ch_active_class"
  >
    <q-card-section
      class="row full-height col"
      horizontal
    >
      <q-btn
        class="q-mr-sm"
        flat
        dense
        @click.stop="$emit('user_info', item)"
      >
        <user-avatar
          v-bind="{ item, size: isCreateFolder ? '25px' : '50px' }"
        />
      </q-btn>
      <q-item-section class="col q-mt-xs overflow-hidden">
        <div
          class="row items-center no-wrap font-black-bold-14 ch_text_ellipsis"
        >
          <template>
            <q-item-label>
              {{ item.name }}
            </q-item-label>
          </template>
        </div>

        <q-item-label
          v-if="
            !isCreateFolder && chatStore.getChatByID(item.id)?.last_message_id
          "
          :class="$style.last_msg"
          class="font-black-normal-12 q-pt-xs ch_text-grey ch_text_ellipsis"
          >{{ itemlast_message_message }}</q-item-label
        >
      </q-item-section>
      <q-item-section
        v-if="!isCreateFolder"
        class="column no-margin items-center col-2"
      >
        <div class="no-wrap row full-width">
          <q-icon
            color="green"
            class="q-mr-xs q-ml-auto"
            :name="'done_all'"
          />
          <q-item-label class="ch_text-grey font-black-normal-12">
            {{ chatStore.getTime() }}
          </q-item-label>
        </div>
        <q-item
          class="row no-padding q-ml-auto q-mr-xs q-my-xs ch_item ch_text-grey_5"
        >
          <q-icon
            name="sym_o_push_pin"
            class="ch_push_pin"
          />
        </q-item>
        <q-item
          class="no-padding items-center q-ml-auto"
          :class="$style.description"
        >
          <q-btn
            v-if="item.chat_type === 'private'"
            padding="none"
            size="xs"
            icon="open_in_new"
            class="q-ml-auto q-mr-xs ch_text-dark"
            @click.stop="() => openFrameWindow(item)"
          />
          <div :class="[$style['ChatFolder-transition'], 'q-ml-auto']">
            <div :class="$style.ChatFolder">
              <span
                :class="$style.contentFolder"
                class="font-black-normal-14"
              >
                {{ chatStore.getUnreadCount() }}
              </span>
            </div>
          </div>
        </q-item>
      </q-item-section>
    </q-card-section>
  </q-item>
</template>

<script setup lang="ts">
import { onBeforeMount, PropType, ref } from 'vue'
// import { useQuasar } from 'quasar'
import { Chat } from 'src/models/Chat'
// const userStore = useUserStoreSM()
// const auth = useAuthStoreSM()
// import { defineAsyncComponent } from 'vue'
import UserAvatar from 'src/components/user/UserAvatar.vue'
// import { useUserStoreSM } from 'src/stores/user'
// import { useAuthStoreSM } from 'src/stores/auth'
import { useChatsStoreSM } from 'src/stores/chat'

const chatStore = useChatsStoreSM()
const itemlast_message_message = ref('last mssage example')
// const $q = useQuasar()
const isCreateFolder = ref(false)
defineEmits(['open_chat', 'user_info'])
const props = defineProps({
  item: {
    type: Object as PropType<Chat>,
    required: true,
  },
})
console.log('input item:', props.item)
function printItem(item: Chat) {
  console.log('input item:', item)
}

function openFrameWindow(item: Chat) {
  console.log('openFrameWindow called', item)
}
// function openFrameWindow(item: Chat) {
//   $q.dialog({
//     component: defineAsyncComponent(
//       () => import('components/messages/ChatMessagesDialog.vue')
//     ),
//     componentProps: {
//       currentRoom: item,
//       height: 30,
//     },
//   })
// }

// const chatName = (chat: Chat) => {
//   if (chat.chat_type === 'private') {
//     const parts = chat.name.split('_')
//     if (Number(parts[0]) === auth.userId) {
//       if (userStore.users.get(Number(parts[1])) === undefined) {
//         userStore.reqGetUser({ profile: '', login: '', id: Number(parts[1]) })
//       }
//       return (
//         userStore.users.get(Number(parts[1]))?.name +
//         ' ' +
//         userStore.users.get(Number(parts[1]))?.surname
//       )
//     } else {
//       if (userStore.users.get(Number(parts[0])) === undefined) {
//         userStore.reqGetUser({ profile: '', login: '', id: Number(parts[0]) })
//       }
//       return (
//         userStore.users.get(Number(parts[0]))?.name +
//         ' ' +
//         userStore.users.get(Number(parts[0]))?.surname
//       )
//     }
//   }

//   return chat.name
// }

onBeforeMount(printItem(props.item))
</script>
<style module lang="scss">
.last_msg {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.arrow {
  width: 8px;
  height: 8px;
  margin-bottom: 5px;
  transition: transform 0.5s;
}
.description {
  min-height: auto;
}
.ChatFolder-transition {
  opacity: 1;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ChatFolder {
  min-width: 1.5rem;
  height: 1.5rem;
  background: rgb(196, 201, 204);
  border-radius: 0.75rem;
  padding: 0 0.4375rem;
  color: #fff;
  font-size: 0.875rem;
  line-height: 1.5625rem;
  font-weight: 500;
  text-align: center;
  flex-shrink: 0;
}
.contentFolder {
  display: inline-flex;
  white-space: pre;
}
</style>
