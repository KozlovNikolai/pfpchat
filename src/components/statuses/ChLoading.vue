<template>
  <q-inner-loading :showing="loading" class="fit ch_max_zIndex" v-bind="$props">
    <q-spinner-comment v-if="loading" size="6em" class="ch-loading" />
    <div class="ch-loading__text q-mt-md" v-if="text">
      {{ $t(text) || '' }}...
    </div>
  </q-inner-loading>
</template>

<script lang="ts" setup>
defineProps({
  loading: Boolean,
  text: String,
});
</script>
