<template>
  <q-btn
    flat
    dense
    icon="sym_o_pending"
    :class="[$style.ch_icon, color]"
  >
    <q-menu
      class="ch_max_zIndex"
      transition-show="jump-down"
      transition-hide="jump-up"
    >
      <q-list>
        <q-item
          clickable
          dense
          v-for="(item, i) in currentRoom.messages"
          :key="i"
          class="q-px-sm"
        >
          <q-item-section>{{ $t(item.msg_type) }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Chat } from 'src/models/Chat'

defineProps({
  currentRoom: {
    type: Object as PropType<Chat>,
    required: true,
  },
  color: {
    type: String,
  },
})
</script>

<style module lang="scss">
.ch_icon {
  z-index: 1;
}
</style>
