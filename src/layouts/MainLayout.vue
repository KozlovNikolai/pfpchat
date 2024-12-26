<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="cStore.path === 'chat' || 'scroll'"
          @click="goBack"
          icon="arrow_back"
          flat
          no-caps
          dense
          label="Back"
        />
        <q-btn
          @click="goScroll"
          icon="arrow_up"
          flat
          no-caps
          dense
          label="Scroll"
        />
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!store.getUser?.userId"
          @click="auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          flat
          no-caps
          dense
          label="Login"
        />
        <q-btn
          v-else
          @click="logout"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          flat
          no-caps
          dense
        >
          Logout<br />
          {{ store.getUser?.name }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <PageStart v-if="cStore.path === 'start'" />
      <PageAuth v-else-if="cStore.path === 'auth'" />
      <PageChat v-else-if="cStore.path === 'chat'" />
      <ScrollPage v-else-if="cStore.path === 'scroll'" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { AxiosError } from 'axios'
import { useCommonStore } from 'src/stores/common'

import PageStart from 'src/pages/PageStart.vue'
import PageAuth from 'src/pages/PageAuth.vue'
import PageChat from 'src/pages/PageChat.vue'
import ScrollPage from 'src/pages/ScrollPage.vue'

const store = useAuthStore()
const cStore = useCommonStore()
const title = computed(() => {
  switch (cStore.path) {
    case 'start':
      return 'Sputnik'
    case 'auth':
      return 'Login'
    case 'chat':
      return 'Chat'
    case 'scroll':
      return 'Scroll'
    default:
      return 'Sputnik'
  }
})

const logout = () => {
  store.logout().catch((e: AxiosError) => {
    console.log(e)
  })
}

const goBack = () => {
  cStore.moveTo('start')
}

const goScroll = () => {
  cStore.moveTo('scroll')
}

const auth = () => {
  cStore.moveTo('auth')
}
</script>
