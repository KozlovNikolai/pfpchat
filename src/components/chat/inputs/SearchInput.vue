<template>
  <div class="relative-position column no-wrap">
    <div
      class="row no-wrap items-center ch-custom-label absolute"
      v-if="label"
    >
      <div class="self-end">{{ label }}</div>
    </div>
    <q-input
      :model-value="search"
      @update:model-value="$emit('update:search', $event)"
      ref="ch_input"
      dense
      outlined
      standout="text-grey"
      class="no-padding ch_list_search q-ml-sm q-my-xs"
      type="search"
    >
      <template v-slot:prepend>
        <q-icon
          name="search"
          size="14px"
          class="ch_text-primary"
        />
      </template>
      <template v-slot:append>
        <q-icon
          v-if="search"
          name="sym_o_close"
          class="cursor-pointer ch_text-grey"
          @click="clearSearch"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['update:search'])
defineProps({
  label: String,
  search: {
    type: String,
    required: true,
  },
})

const ch_input = ref()

function clearSearch() {
  ch_input.value.blur()
  emit('update:search', '')
}
</script>
