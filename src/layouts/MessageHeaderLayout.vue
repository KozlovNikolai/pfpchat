<template>
  <div
    class="ch_min_width_widget fit column ch_bg-grey_2 col relative-position"
  >
    <header-message
      v-bind="{ currentRoom: room }"
      @join_profile="joinUserProfile"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useUserStoreSM } from 'src/stores/user'
import { Chat } from 'src/models/Chat'
import HeaderMessage from 'src/components/chat/Headers/HeaderMessage.vue'

defineEmits(['select:room'])

defineProps({
  room: {
    type: Object as PropType<Chat>,
    required: true,
  },
  isMiniMode: {
    type: Boolean,
    default: false,
  },
})

const userStore = useUserStoreSM()

function joinUserProfile(id: string) {
  userStore.getUserByID(Number(id))
}
</script>
