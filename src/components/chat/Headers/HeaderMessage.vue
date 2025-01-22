<template>
  <div
    elevated
    class="ch_header_message"
  >
    <q-item
      class="row justify-between q-px-xs q-py-none items-center fit ch_bg-white ch_border-left-grey ch_text-dark"
    >
      <q-item-label
        class="row items-center cursor-pointer"
        @click="joinProfile"
      >
        <user-avatar
          v-bind="{ item: currentRoom, size: '40px' }"
          class="q-mr-sm"
        />

        <div
          class="column"
          v-if="currentRoom?.chat_type === 'private'"
        >
          <span>
            {{ currentRoom.users[0] + ' to ' + currentRoom.users[1] }}
          </span>
          <div>
            <q-icon
              v-if="getColorBadge()"
              name="circle"
              size="10px"
              :color="getColorBadge()"
              class="q-mr-xs"
            />
            <span class="no-margin">{{ $t(currentRoom.name + 'qwerty') }}</span>
          </div>
        </div>
        <q-item-label v-else>{{ currentRoom.name }}</q-item-label>
      </q-item-label>
      <q-item-label>
        <q-btn
          flat
          dense
          icon="sym_o_search"
          class="ch_text-grey"
        />
        <options-button v-bind="{ ...$props, color: 'ch_text-grey' }" />
      </q-item-label>
    </q-item>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { Chat } from 'src/models/Chat'

import OptionsButton from 'components/chat/Buttons/OptionsButton.vue'
import UserAvatar from 'src/components/user/UserAvatar.vue'

const emit = defineEmits(['join_profile'])

const props = defineProps({
  currentRoom: {
    type: Object as PropType<Chat>,
    required: true,
  },
})

function getColorBadge() {
  // if (props.currentRoom.getUserIsOnline === 'online') {
  //   return 'green';
  // }
  return 'green'
}
function joinProfile() {
  if (props.currentRoom.chat_type === 'private')
    // emit('join_profile', props.currentRoom.getOpponent?.id)
    emit('join_profile', props.currentRoom.users[0])
}
</script>
