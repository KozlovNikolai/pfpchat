<template>
  <q-avatar
    :size="size"
    v-bind="$props"
    v-if="true"
  >
    <img :src="'avatars/users-1.svg'" />
  </q-avatar>
  <div
    v-else
    class="ch_avatar_unknown position-relative column items-center justify-center"
    :style="{
      width: size,
      aspectRatio: 1,
      background: 'green',
    }"
  >
    <q-item-label class="font-black-bold-12-sm text-white">{{
      item.name
    }}</q-item-label>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Chat } from 'src/models/Chat'
import { ChatUser } from 'src/models/ChatUser'

const props = defineProps({
  item: {
    type: Object as PropType<Chat | ChatUser>,
    required: true,
  },
  size: {
    default: '25px',
  },
})

console.log('user avatar vue: ', props.item, props.size)

// defineProps({
//   item: {
//     type: Object as PropType<Chat | ChatUser>,
//     required: true,
//   },
//   size: {
//     default: '25px',
//   },
// })
</script>
