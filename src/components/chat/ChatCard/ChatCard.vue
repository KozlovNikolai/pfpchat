<template>
  <q-card
    class="fit column ch_chat-card overflow-hidden"
    :style="{
      width: cStore.getDialogWidth,
      height: cStore.getDialogHeight,
    }"
    flat
  >
    <q-item class="search_item q-pa-none ch_bg-white">
      <div class="fit column">
        <div class="row items-center q-mt-xs">
          <div class="row col justify-end no-wrap">
            <SearchInput
              v-bind="{ search }"
              class="col"
              @update:search="search = $event"
              :label="$t('search')"
            />
            <div class="q-mx-xs">
              <q-btn
                flat
                dense
                class="font-black-normal-12"
                v-for="btn in configBTN"
                :key="btn.name"
                @click="actionButton(btn.action)"
              >
                <q-icon
                  size="sm"
                  :name="btn.icon"
                  class="ch_icon-active"
                />
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-item>
    <!-- <card-list
      v-if="rooms.length > 0"
      class="col"
      v-bind="{ items: getItems() }"
      @open_chat="$emit('open_chat', $event)"
      @user_info="joinUserProfile($event)"
    /> -->
    <card-list
      class="col"
      @open_chat="$emit('open_chat', $event)"
      @user_info="joinUserProfile($event)"
    />
    <!-- <div class="row fit justify-center items-center text-dark" v-else>
      {{ $t('rooms not found in this folder') }}
    </div> -->
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { ChatRoom } from 'src/models/chat/room';
// import { useUserStore } from 'src/stores/user/user';
// import { useChatStore } from 'src/stores/chat';
const cStore = useCommonStoreSM()

import CardList from './CardList.vue'
// import CardList from '../../../pages/PageStart.vue'
import SearchInput from '../inputs/SearchInput.vue'
import { useCommonStoreSM } from 'src/stores/common'
import { Chat } from 'src/models/Chat'
// const props = defineProps({
//   rooms: {
//     type: Array as PropType<ChatRoom[]>,
//     required: true,
//   },
// });
defineEmits(['open_chat', 'user_info'])

// const store = useChatStore(),
const search = ref('')
// userStore = useUserStore(),
const configBTN = [
  { name: 'contacts', action: 'add_contact', icon: 'sym_o_person' },
  { name: 'create_group', action: 'create_group', icon: 'sym_o_groups' },
  { name: 'create_group', action: 'filter', icon: 'sym_o_filter_alt' },
]

// function getItems() {
//   return props.rooms.filter((room) => {
//     if (room.isPrivate) {
//       return room.getOpponentFullName
//         ?.toLocaleLowerCase()
//         .includes(search.value.toLocaleLowerCase());
//     } else {
//       return room.name
//         .toLocaleLowerCase()
//         .includes(search.value.toLocaleLowerCase());
//     }
//   });
// }

// async function joinUserProfile(item: ChatRoom) {
//   if (item.getOpponent) {
//     await userStore.getUserById(item.getOpponent.id)
//   }
// }

function joinUserProfile(item: Chat) {
  console.log('joinUserProfile called', item)
}

function actionButton(action: string) {
  switch (action) {
    case 'create_group':
      // cStore.setChatType('create_group')
      console.log('create_group called')
      break
    case 'add_contact':
      // cStore.setChatType('contacts')
      console.log('add_contact called')
      break
    case 'filter':
      console.log('filter called')
      break
    default:
      console.log('default called')
      break
  }
}
</script>
