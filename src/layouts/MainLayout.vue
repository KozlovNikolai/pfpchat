<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          @click="goBack"
          icon="arrow_back"
          flat
          no-caps
          dense
          label="Back"
        />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!store.getUser?.userId"
          to="/auth"
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { AxiosError } from 'axios'

const route = useRoute()
const router = useRouter()
const title = ref('')
const store = useAuthStore()

const updateTitle = () => {
  switch (route.fullPath) {
    case '/':
      title.value = 'Sputnik'
      break
    case '/auth':
      title.value = 'Login'
      break
    case '/chat':
      title.value = 'Chat'
      break
    default:
      title.value = 'Sputnik'
  }
}

const logout = () => {
  store.logout().catch((e: AxiosError) => {
    console.log(e)
  })
}

const goBack = () => {
  router.go(-1)
}
watch(route, updateTitle, { immediate: true })
watch(route, (newRoute) => {
  console.log('Route changed: ', newRoute.fullPath)
})
</script>
