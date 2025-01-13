<template>
  <q-form>
    <q-input
      v-if="tab === 'byToken'"
      v-model="token"
      class="q-mb-md"
      outlined
      label="Token"
      @blur="updateToken"
    />
    <q-input
      v-if="tab === 'register'"
      v-model="formData.name"
      class="q-mb-md"
      outlined
      label="Name"
    />
    <q-input
      v-if="tab === 'register'"
      v-model="formData.surname"
      class="q-mb-md"
      outlined
      label="Surname"
    />
    <q-input
      v-if="tab === 'register' || tab === 'login'"
      v-model="formData.email"
      class="q-mb-md"
      outlined
      autocomplete="email"
      label="Email"
    />
    <q-input
      v-if="tab === 'register' || tab === 'login'"
      v-model="formData.password"
      class="q-mb-md"
      outlined
      type="password"
      autocomplete="current-password"
      label="Password"
    />
    <div class="row">
      <q-space />
      <q-btn
        @click="submitForm"
        color="primary"
        :label="tab"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { AxiosError } from 'axios'
import { useLocalStore } from 'src/stores/localstorage'

const props = defineProps<{ tab: string }>()

const authStore = useAuthStore()
const localStore = useLocalStore()

const formData: Ref<{
  name: string
  surname: string
  email: string
  password: string
  token: string
}> = ref({
  name: '',
  surname: '',
  email: '',
  password: '',
  token: '',
})
const token = computed({
  get: () => localStore.token,
  set: (value) => {
    localStore.setToken(value)
  },
})

const updateToken = () => {
  localStore.setToken(token.value)
}

const loading = ref(false)

const submitForm = () => {
  loading.value = true

  if (props.tab === 'login') {
    authStore
      .loginByEmail(formData.value)
      .catch((e: AxiosError) => {
        console.log(e)
      })
      .finally(() => {
        loading.value = false
      })
  } else if (props.tab === 'register') {
    authStore
      .register(formData.value)
      .catch((e: AxiosError) => {
        console.log(e)
      })
      .finally(() => {
        loading.value = false
      })
  } else if (props.tab === 'byToken') {
    formData.value.token = token.value
    authStore
      .loginByToken(formData.value)
      .catch((e: AxiosError) => {
        console.log(e)
      })
      .finally(() => {
        loading.value = false
      })
  }
}
</script>
