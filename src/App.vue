<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useChatStore } from './stores/example-store'

export default defineComponent({
  name: 'App',

  setup() {
    // const store = useChatStore()
    // onMounted(() => {
    //   console.log('APP MOUNTED')
    //   store.handleAuthStateChanged()
    // })
  },
})
</script>
