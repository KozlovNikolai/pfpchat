<template>
  <q-form>
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
      v-model="formData.email"
      class="q-mb-md"
      outlined
      autocomplete="email"
      label="Email"
    />
    <q-input
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
import { Ref, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { AxiosError } from 'axios'

const props = defineProps<{ tab: string }>()

const store = useAuthStore()

const formData: Ref<{
  name: string
  surname: string
  email: string
  password: string
}> = ref({
  name: '',
  surname: '',
  email: 'cmd@cmd.ru',
  password: '123456',
})

const loading = ref(false)

const submitForm = () => {
  loading.value = true

  if (props.tab === 'login') {
    store
      .loginByEmail(formData.value)
      .catch((e: AxiosError) => {
        console.log(e)
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    store
      .register(formData.value)
      .catch((e: AxiosError) => {
        console.log(e)
      })
      .finally(() => {
        loading.value = false
      })
  }
}
</script>
