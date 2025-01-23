<template>
  <q-btn
    flat
    class="ch_text-primary cursor-pointer q-my-sm"
    icon="arrow_back"
    color="ch_text-grey"
    @click="backToRooms"
    dense
    :class="$style.ch_icon"
  />
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useChatsStoreSM } from 'src/stores/chat'
import { Chat } from 'src/models/Chat'

const props = defineProps({
  chat: {
    type: Object as PropType<Chat>,
    required: true,
  },
})

const store = useChatsStoreSM()

function backToRooms() {
  console.log('click button in chat: ', store.currentChatID, props.chat.name)
  // store.setChatType('rooms');
  // store.setCurrentRoom(null);
}
</script>

<style module lang="scss">
.ch_icon {
  z-index: 1;
}
.ch_button {
  margin-right: 32px;
}
</style>
