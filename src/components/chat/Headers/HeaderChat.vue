<template>
  <div
    class="row justify-center items-center full-width q-mb-none ch_bg-grey_2"
  >
    <div
      v-if="cStore.isMiniMode"
      class="absolute-left row"
    >
      <header-buttons v-bind="{ chat }" />
    </div>
    <q-item-label
      class="font-black-normal-14 absolute-center col row justify-center"
    >
      {{ $t('Chat') }} {{ chat_name }}
    </q-item-label>

    <q-btn
      size="14px"
      flat
      class="q-ml-auto q-pa-sm ch_text-dark"
      :class="$style.ch_button"
      @click="toggleExtendedChat"
    >
      <!-- <q-icon name="chrome_reader_mode"  /> -->
      <q-icon name="sym_o_picture_in_picture_alt" />
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue'

import HeaderButtons from 'components/chat/Buttons/HeaderButtons.vue'
import { Chat } from 'src/models/Chat'
import { useUserStoreSM } from 'src/stores/user'
import { useAuthStoreSM } from 'src/stores/auth'
import { useCommonStoreSM } from 'src/stores/common'
const userStore = useUserStoreSM()
const auth = useAuthStoreSM()
const cStore = useCommonStoreSM()
const chat_name = ref<string>()

const props = defineProps({
  chat: {
    type: Object as PropType<Chat>,
    required: true,
  },
})

const chatName = async (chat: Chat) => {
  console.log('chatName input:', chat)
  if (chat.chat_type === 'private') {
    const parts = chat.name.split('_')
    if (Number(parts[0]) === auth.userId) {
      if (userStore.users.get(Number(parts[1])) === undefined) {
        userStore
          .reqGetUser({ profile: '', login: '', id: Number(parts[1]) })
          .then(() => {
            return (
              userStore.users.get(Number(parts[1]))?.name +
              ' ' +
              userStore.users.get(Number(parts[1]))?.surname
            )
          })
      }
      return (
        userStore.users.get(Number(parts[1]))?.name +
        ' ' +
        userStore.users.get(Number(parts[1]))?.surname
      )
    } else {
      if (userStore.users.get(Number(parts[0])) === undefined) {
        userStore
          .reqGetUser({ profile: '', login: '', id: Number(parts[0]) })
          .then(() => {
            return (
              userStore.users.get(Number(parts[0]))?.name +
              ' ' +
              userStore.users.get(Number(parts[0]))?.surname
            )
          })
      }
      return (
        userStore.users.get(Number(parts[0]))?.name +
        ' ' +
        userStore.users.get(Number(parts[0]))?.surname
      )
    }
  }

  return chat.name
}
const toggleExtendedChat = () => {
  console.log('toggle extended mode')
}
onMounted(() => {
  chatName(props.chat).then((nm) => {
    chat_name.value = nm
  })
})
</script>

<style module lang="scss">
.ch_icon {
  z-index: 1;
}
.ch_button {
  margin-right: 32px;
}
</style>
