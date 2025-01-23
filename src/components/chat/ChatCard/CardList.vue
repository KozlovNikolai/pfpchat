<template>
  <q-virtual-scroll
    ref="scrollArea"
    :virtual-scroll-item-size="62"
    :virtual-scroll-sticky-size-start="32"
    :items="getSortItems()"
    @virtual-scroll="onVirtualScroll"
    class="fit"
  >
    <template v-slot="{ item }: { item: Chat }">
      <card-item
        v-if="item instanceof Chat"
        v-bind="{
          item,
        }"
        @open_chat="$emit('open_chat', $event)"
        @user_info="$emit('user_info', $event)"
      />
      <card-user
        v-else
        v-bind="{ item }"
        @open_chat="$emit('open_chat', $event)"
      />
    </template>
    <template #after>
      <div
        class="col ch_sticky-bottom cursor-pointer q-pa-xs ch_bg-grey_2 rounded-borders shadow-2 ch_chat-card__scroller row items-center no-wrap justify-center"
        v-if="fabVisible"
        @click="onTop"
      >
        <q-icon
          name="north"
          class="ch_text-dark"
        />
        <span class="font-black-normal-12-sm text-center"
          >{{ $t('Scroll back up') }}...</span
        >
      </div>
    </template>
  </q-virtual-scroll>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import { ChatRoom } from 'src/models/chat/room'
// import { ChatUser } from 'src/models/chat/user'
import { Chat } from 'src/models/Chat'
import CardUser from './CardUser.vue'
import CardItem from './CardItem.vue'
import { useChatsStoreSM } from 'src/stores/chat'

defineEmits(['open_chat', 'user_info'])

// const props = defineProps({
//   items: {
//     type: Array as PropType<ChatRoom[] | ChatUser[]>,
//     required: true,
//   },
//   isCreateFolder: {
//     type: Boolean,
//     default: false,
//   },
// });
const chatsStore = useChatsStoreSM()

const scrollArea = ref(),
  fabVisible = ref(false)

const onTop = () => {
  scrollArea.value.scrollTo(0, 'start')
  fabVisible.value = false
}

const onVirtualScroll = (detail: { index: number }) => {
  fabVisible.value = detail.index > 7
}

function getSortItems() {
  console.log(chatsStore.chatsArray)
  return chatsStore.chatsArray as Chat[]
}
// function getSortItems() {
//   if (props?.items?.[0] instanceof ChatRoom) {
//     const items = [...props.items]
//     return items.sort((a, b) => {
//       if (
//         a instanceof ChatRoom &&
//         b instanceof ChatRoom &&
//         a.last_message &&
//         b.last_message &&
//         a?.last_message?.created_at <= b?.last_message?.created_at
//       ) {
//         return 1
//       } else {
//         return -1
//       }
//     }) as ChatRoom[]
//   }
//   return props.items
// }

onMounted(onTop)
</script>
