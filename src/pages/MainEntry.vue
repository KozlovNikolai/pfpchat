<template>
  <component
    v-if="props.initializationParams.Application === 'sputnik-monitor'"
    :is="SputnikButton"
    v-bind="$props"
  />
</template>

<script setup lang="ts">
import { PropType, defineAsyncComponent, onBeforeMount } from 'vue'

import { InitializationParams } from 'src/models/common/types'
import { useCommonStoreSM } from 'src/stores/common'
import { useAuthStoreSM } from 'src/stores/auth'
import { AxiosError } from 'axios'

const store = useAuthStoreSM()
const cStore = useCommonStoreSM()
const SputnikButton = defineAsyncComponent(
    () => import('../components/MyButton.vue')
  ),
  props = defineProps({
    initializationParams: {
      type: Object as PropType<InitializationParams>,
      required: true,
    },
  })

function mount() {
  console.log('on before mount Main Layout')
  console.log('token:', props.initializationParams.token)
  console.log('user_id:', props.initializationParams.user_id)
  console.log('Application:', props.initializationParams.Application)
  console.log('mount comm store', cStore.path)
  if (props.initializationParams.token) {
    store
      .loginByToken({ token: props.initializationParams.token })
      .catch((e: AxiosError) => {
        console.log(e)
      })
      .finally(() => {
        console.log('Auth end')
        console.log(cStore.path)
        cStore.moveTo('start')
      })
  }
}

onBeforeMount(mount)
</script>
<style lang="scss">
@import '../css/chat_app.scss';
</style>
