<template>
  <q-card-actions class="full-width">
    <q-file
      :model-value="file"
      @update:model-value="changeModelValueFile"
      ref="fileRef"
      clearable
      filled
      class="hidden"
    />

    <q-input
      rounded
      outlined
      dense
      :model-value="modelValue"
      @update:model-value="$emit('update:model-value', $event)"
      @keydown.enter.prevent="$emit('send')"
      bg-color="white"
      color="grey"
      class="col ch_input no-padding"
      placeholder="Напишите сообщение..."
      v-bind="$props"
    >
      <template #prepend>
        <q-btn
          dense
          flat
          round
          :ripple="false"
          size="15px"
          @click="handleFileChange"
          class="no-padding"
        >
          <q-icon name="sym_o_attach_file" rounded />
        </q-btn>
      </template>
      <template #append>
        <q-icon
          v-show="modelValue"
          name="sym_o_close"
          class="cursor-pointer absolute ch_text-grey"
          style="right: 42px"
          @click="onClear"
        />
        <q-btn
          dense
          flat
          round
          :ripple="false"
          size="15px"
          @click="$emit('send')"
          :disable="!modelValue"
        >
          <q-icon name="sym_o_forward" rounded />
        </q-btn>
      </template>
    </q-input>
  </q-card-actions>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits([
    'update:model-value',
    'update:files',
    'clear',
    'send',
  ]),
  file = ref(),
  fileRef = ref();

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

function onClear() {
  emit('update:model-value', '');
  emit('clear');
}

function changeModelValueFile(f: File) {
  file.value = f;
  emit('update:files', f);
}

function handleFileChange() {
  fileRef.value.pickFiles();
}
</script>
