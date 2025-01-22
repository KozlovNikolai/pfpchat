<template>
  <q-item-label
    class="ch_text_title text-left"
    dense
    flat
    :disable="false"
    :label="'chat'"
    @click.stop="openChat"
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
import { useQuasar } from 'quasar'
import { InitializationParams } from 'src/models/common/types'
import { PropType } from 'vue'
// import ChatDialog from '../layouts/MainLayout.vue'
import ChatDialog from '../components/chat/ChatDialog.vue'
import { useCommonStoreSM } from 'src/stores/common'

const $q = useQuasar()
const store = useCommonStoreSM()
const props = defineProps({
  initializationParams: {
    type: Object as PropType<InitializationParams>,
    required: true,
  },
})

const openChat = () => {
  console.log('MyButton pressed')
  console.log('token:', props.initializationParams.token)
  console.log('user_id:', props.initializationParams.user_id)
  console.log('Application:', props.initializationParams.Application)

  $q.dialog({
    component: ChatDialog,
    componentProps: {
      initializationParams: props.initializationParams,
      showCallback: () => store.setIsOpen(true),
      hideCallback: () => store.setIsOpen(false),
    },
  })
}

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
