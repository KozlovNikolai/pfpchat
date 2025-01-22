<template>
  <LogInProgram v-bind="$props" />
</template>

<script setup lang="ts">
import { PropType, defineAsyncComponent } from 'vue'
import { InitializationParams } from 'src/models/common/types'

const LogInProgram = defineAsyncComponent(() => import('./pages/MainEntry.vue'))

defineProps({
  initializationParams: {
    type: Object as PropType<InitializationParams>,
    required: true,
  },
})
</script>
