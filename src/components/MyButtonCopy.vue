<template>
  <q-item-label
    class="ch_text_title text-left"
    dense
    flat
    :disable="false"
    :label="'chat'"
    icon="menu"
  >
    <q-icon
      name="sym_o_chat_bubble"
      color="#646567"
      size="22px"
    />
  </q-item-label>
</template>

<script setup lang="ts">
import { InitializationParams } from 'src/models/common/types'
import { PropType } from 'vue'

const props = defineProps({
  initializationParams: {
    type: Object as PropType<InitializationParams>,
    required: true,
  },
})

// const openChat = () => {
//   console.log('on before mount Main Layout')
//   console.log('token:', props.initializationParams.token)
//   console.log('user_id:', props.initializationParams.user_id)
//   console.log('Application:', props.initializationParams.Application)
// }
console.log('on before mount Main Layout')
console.log('token:', props.initializationParams.token)
console.log('user_id:', props.initializationParams.user_id)
console.log('Application:', props.initializationParams.Application)
// const openChat = () => {
//   if (!store.getIsOpen) {
//     $q.dialog({
//       component: ChatDialog,
//       componentProps: {
//         showCallback: () => store.setIsOpen(true),
//         hideCallback: () => store.setIsOpen(false),
//       },
//     });
//   }
// };
</script>

<style lang="scss">
@import '../css/chat_app.scss';
</style>
