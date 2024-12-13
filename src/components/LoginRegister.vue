<template>
  <q-form>
    <q-input
      v-if="tab == 'register'"
      v-model="formData.name"
      class="q-mb-md"
      outlined
      label="Name"
    />
    <q-input
      v-if="tab == 'register'"
      v-model="formData.surname"
      class="q-mb-md"
      outlined
      label="Surname"
    />
    <q-input
      v-model="formData.email"
      class="q-mb-md"
      outlined
      label="Email"
    />
    <q-input
      v-model="formData.password"
      class="q-mb-md"
      outlined
      type="password"
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

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()

export default defineComponent({
  name: 'LoginRegister',
  props: ['tab'],
  setup(props) {
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
    const submitForm = () => {
      if (props.tab == 'login') {
        store.login(formData.value)
      } else {
        store.register(formData.value)
      }
    }

    return {
      formData,
      submitForm,
    }
  },
})
</script>
