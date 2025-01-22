<template>
  <q-item
    clickable
    v-ripple
    square
    dense
    class="full-width q-pa-xs no-shadow ch_card_item-chat"
    :active="true"
    active-class="ch_active_class"
    @click.stop="$emit('open_chat', item)"
  >
    <q-card-section
      class="fit row items-center"
      horizontal
    >
      <q-btn
        class="q-mr-sm"
        flat
        dense
      >
        <user-avatar v-bind="{ item, size: '25px' }" />
      </q-btn>
      <q-item-label class="q-mt-xs font-black-normal-14">
        {{ userStore.getFullName(item.id) }}
      </q-item-label>
    </q-card-section>
  </q-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ChatUser } from 'src/models/ChatUser'
import UserAvatar from 'src/components/user/UserAvatar.vue'
import { useUserStoreSM } from 'src/stores/user'

const userStore = useUserStoreSM()

defineEmits(['open_chat', 'user_info'])
defineProps({
  item: {
    type: Object as PropType<ChatUser>,
    required: true,
  },
})
</script>
