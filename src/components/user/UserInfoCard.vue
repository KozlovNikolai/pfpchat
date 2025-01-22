<template>
  <q-layout
    v-if="visible && profile && !store.getIsMiniMode"
    transition-hide="slide-left"
    transition-show="slide-right"
    class="ch_layout_user"
    container
  >
    <q-item-section>
      <q-item class="items-center q-pb-none">
        <q-item-label class="font-black-bold-14">
          {{ $t('User_info') }}
        </q-item-label>
        <q-item-section
          side
          class="absolute-right no-padding"
        >
          <q-btn
            flat
            icon="sym_o_close"
            color="ch_text-grey"
            @click="hideUser()"
            dense
          />
        </q-item-section>
      </q-item>
      <q-item class="q-pt-none">
        <user-avatar v-bind="{ item: profile, size: '55px' }" />
        <q-item-section class="row q-ml-md">
          <q-item-label class="font-black-bold-14 text-no-wrap">{{
            $t(authStore.getFullName)
          }}</q-item-label>
          <q-item-label class="font-black-normal-12-sm">
            {{ $t(profile.profile) }}
          </q-item-label>
          <q-item-label class="font-black-normal-12-sm ch_text-grey">
            {{ $t('job_title') }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item dense>
        <q-item-label class="font-black-normal-12-sm ch_text-grey">
          {{ $t('was_online') }}: {{ profile.lastOnline }}
        </q-item-label>
      </q-item>
      <q-item class="q-pt-none column">
        <q-item-label class="font-black-bold-14-sm"
          >{{ $t('Contact_detail') }}:</q-item-label
        >
        <q-item-label
          v-for="(conf, index) in authStore.getContactDetailConfig"
          :key="index"
          class="cursor-pointer font-black-normal-12"
        >
          <q-icon
            size="sm"
            class="q-mr-sm ch_text-grey"
            :name="conf.icon"
          />
          {{ conf.name }}
        </q-item-label>
      </q-item>
      <q-separator />
      <q-item class="row full-width items-center ch_text-grey">
        <q-icon
          size="sm"
          name="sym_o_notifications"
          class="q-mr-sm ch_text-grey"
        />
        <q-item-label class="font-black-normal-12 q-mt-xs">
          {{ $t('notification') }}</q-item-label
        >
        <q-toggle
          class="q-ml-xs"
          size="sm"
          v-model="notification"
        />
      </q-item>
      <q-separator />
      <q-item class="column no-padding">
        <q-btn flat>
          <q-item-label class="font-black-bold-12 q-mt-xs">
            {{ $t('Share_this_contact') }}</q-item-label
          >
        </q-btn>
        <q-btn flat>
          <q-item-label class="font-black-bold-12 q-mt-xs">
            {{ $t('Change_this_contact') }}</q-item-label
          >
        </q-btn>
      </q-item>
    </q-item-section>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
// import { useUserStore } from 'src/stores/user/user'
// import { useUserStoreSM } from 'src/stores/user'
// import { useChatStore } from 'src/stores/chat';
import { useCommonStoreSM } from 'src/stores/common'

import UserAvatar from 'src/components/user/UserAvatar.vue'
import { useAuthStoreSM } from 'src/stores/auth'

const authStore = useAuthStoreSM()
// const userStore = useUserStoreSM()
const visible = ref(true)
const store = useCommonStoreSM()
const notification = ref(false)

const profile = computed(() => authStore.getProfileUser)
// const profile = computed(() => userStore.getProfileUser)

function hideUser() {
  console.log('hideUser button pressed')
  visible.value = !visible.value
  // userStore.clearProfile()
}
</script>
