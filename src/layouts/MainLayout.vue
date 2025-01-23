<template>
  <q-dialog
    v-model="layout"
    seamless
  >
    <q-layout
      view="LHh lpR fFf"
      container
      class="bg-white text-dark"
    >
      <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
          <q-btn
            v-if="cStore.path === 'chat' || cStore.path === 'search'"
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
            v-if="cStore.path === 'chat' || cStore.path === 'start'"
            @click="goSearch"
            icon="search"
            flat
            no-caps
            dense
            label="Search"
          />
          <q-btn
            flat
            v-close-popup
            round
            dense
            icon="close"
          />
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

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
      >
        <q-list>
          <q-item-label header> Essential Links </q-item-label>

          <EssentialLink
            v-for="link in linksList"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-drawer>
      <q-page-container>
        <PageStart v-if="cStore.path === 'start'" />
        <PageAuth v-else-if="cStore.path === 'auth'" />
        <PageChat v-else-if="cStore.path === 'chat'" />
        <PageSearch v-else-if="cStore.path === 'search'" />
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue'
import EssentialLink, {
  type EssentialLinkProps,
} from 'components/EssentialLink.vue'

import { computed } from 'vue'
import { useAuthStoreSM } from 'src/stores/auth'
import { AxiosError } from 'axios'
import { useCommonStoreSM } from 'src/stores/common'

import PageStart from 'src/pages/PageStart.vue'
import PageAuth from 'src/pages/PageAuth.vue'
import PageChat from 'src/pages/PageChat.vue'
import PageSearch from 'src/pages/PageSearch.vue'
import { useUserFindStoreSM } from 'src/stores/search'
import { InitializationParams } from 'src/models/common/types'
const leftDrawerOpen = ref(false)

const linksList: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
]

const storeFind = useUserFindStoreSM()
const store = useAuthStoreSM()
const cStore = useCommonStoreSM()
const layout = ref(true)
const props = defineProps({
  initializationParams: {
    type: Object as PropType<InitializationParams>,
    required: true,
  },
  showCallback: Function,
  hideCallback: Function,
})

async function mount() {
  console.log('on before mount Main Layout')
  console.log('token:', props.initializationParams.token)
  console.log('user_id:', props.initializationParams.user_id)
  console.log('Application:', props.initializationParams.Application)
  console.log('mount comm store:', cStore.path)
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

const title = computed(() => {
  switch (cStore.path) {
    case 'start':
      return 'Sputnik'
    case 'auth':
      return 'Login'
    case 'chat':
      return 'Chat'
    case 'search':
      return 'Search'
    default:
      return 'Sputnik.'
  }
})

const logout = () => {
  cStore.moveTo('auth')
  console.log('logout comm store', cStore.path)
  storeFind.clearUsers()
  store.logout().catch((e: AxiosError) => {
    console.log(e)
  })
}

const goBack = () => {
  cStore.moveTo('start')
  console.log('goBack comm store', cStore.path)
}

const goSearch = () => {
  cStore.moveTo('search')
  console.log('goSearch comm store', cStore.path)
}

const auth = () => {
  cStore.moveTo('auth')
  cStore.setIsOpen(true)
  console.log('goAuth comm store', cStore.path)
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
onMounted(mount)
</script>
