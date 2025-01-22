<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
    transition-hide="slide-down"
    transition-show="slide-up"
    id="dialog"
    ref="ch_dialog"
    maximized
    persistent
    v-bind="$props"
    :class="[$style.dialog, isSingleChat && 'ch_single_chat']"
  >
    <q-layout container>
      <q-page-sticky
        ref="ch_container"
        :offset="[pos.x, pos.y]"
        :style="{
          width: getWidth(),
          height: getHeight(),
          alignItems,
        }"
        position="top-left"
        expand
        class="container row"
        :class="$style.container"
      >
        <div
          :class="[$style.resizer, $style.resizer_left]"
          @mousedown.prevent="onResize('left', $event)"
        />
        <div
          :class="[$style.resizer, $style.resizer_top]"
          @mousedown.prevent="onResize('top', $event)"
        />
        <div
          :class="[$style.resizer, $style.resizer_right]"
          @mousedown.prevent="onResize('right', $event)"
        />
        <div
          :class="[$style.resizer, $style.resizer_bottom]"
          @mousedown.prevent="onResize('bottom', $event)"
        />
        <q-card
          class="fit column no-wrap relative-position"
          :class="$style['q-card']"
        >
          <q-item
            class="justify-between cursor-move q-pa-none"
            draggable="false"
            v-touch-pan.prevent.mouse="handleSwipe"
            ref="card_item"
          >
            <slot name="header" />
            <q-item-section
              side
              class="absolute-right no-padding"
            >
              <q-btn
                flat
                icon="sym_o_close"
                color="ch_text-grey"
                @click="hide()"
                dense
              />
            </q-item-section>
          </q-item>
          <q-item
            class="fit row no-padding"
            :style="{
              width: getWidth(),
              height: getHeight(),
            }"
          >
            <!--SIDE_BAR-->
            <slot name="aside" />

            <!--HEADER-->
            <div class="col column">
              <slot name="body" />
              <slot name="footer" />
            </div>
            <slot name="right-aside" />
          </q-item>
        </q-card>
      </q-page-sticky>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useQuasar, debounce, useDialogPluginComponent } from 'quasar'

// import { useChatStore } from 'src/stores/chat';
import { useCommonStoreSM } from 'src/stores/common'

const props = defineProps({
  modelValue: Boolean,
  persistent: { type: Boolean, default: false },
  seamless: { type: Boolean, default: true },
  alignItems: { default: 'start' },
  isExtended: { default: false },
  width: String,
  height: String,
  isSingleChat: { default: false },
})

const emit = defineEmits([
  'hide',
  'update:model-value',
  'update:sizes',
  ...useDialogPluginComponent.emits,
])

const dialog = ref(),
  $q = useQuasar(),
  ch_dialog = ref(),
  ch_container = ref(),
  // chatStore = useChatStore(),
  chatStore = useCommonStoreSM(),
  card_item = ref(),
  pos = reactive({
    x: $q.screen.width,
    y: $q.screen.height,
  })

function getWidth() {
  return props.width ?? chatStore.getDialogWidth + 'px !important'
}
function getHeight() {
  return props.height ?? chatStore.getDialogHeight + 'px !important'
}

const watcherSizes = () => {
  const viewport = window.visualViewport
  const container = ch_dialog.value.contentEl?.querySelector('.container')
  if (viewport && container) {
    const dialogWidth = container.childNodes[0].offsetWidth
    const maxWidth = viewport.width - 100
    const minWidth = 50 - dialogWidth
    const maxHeight = viewport.height - 50
    pos.x = Math.min(maxWidth, Math.max(minWidth, pos.x))
    pos.y = Math.min(maxHeight, Math.max(0, pos.y))
  }
}

watch(pos, debounce(watcherSizes, 100))

const show = (
  position: string,
  dimensionsObj?: { width: number; height: number }
) => {
  const { width, height } = $q.screen
  const single_dialogs = document.querySelectorAll('.ch_single_chat')
  const single_dialog_counters = single_dialogs.length
  if (single_dialog_counters > 5) {
    hide()
  }

  switch (position) {
    case 'top-right':
      pos.x = width - width / 4
      pos.y = 70
      break
    case 'center':
      pos.x = (width - 1200) / 2
      pos.y = (height - 800) / 2
      break
    case 'bottom-right':
      if (!dimensionsObj) return
      pos.x = width - (dimensionsObj.width + 2) * single_dialog_counters
      pos.y = height - 100 - (height * dimensionsObj.height) / 100
      break
    case 'bottom-center':
      pos.x = width - width / 1.7
      pos.y = height - height / 4
      break
    case 'top-left':
      pos.x = 0
      pos.y = 0
      break
    case 'center-left':
      if (!dimensionsObj) return
      pos.x = 0
      pos.y = height - dimensionsObj.height
      break
    case 'bottom-left':
      if (!dimensionsObj) return
      pos.x = 0
      pos.y = height - dimensionsObj.height
      break
    case 'top-center':
      pos.x = width - width / 1.7
      pos.y = 0
      break
  }
}

const hide = () => {
  emit('update:model-value', false)
  dialog.value?.hide()
  emit('hide')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleSwipe = (e: any) => {
  pos.x += e.delta.x
  if (e.evt.clientY > 0) pos.y += e.delta.y
}

const onResize = (direction: string, event: MouseEvent) => {
  if (props.isSingleChat) return
  if (!document.defaultView) return
  const startX = event.clientX
  const startY = event.clientY
  const startWidth = parseInt(
    document.defaultView.getComputedStyle(ch_container.value.$el).width,
    10
  )
  const startHeight = parseInt(
    document.defaultView.getComputedStyle(ch_container.value.$el).height,
    10
  )
  const startTop = parseInt(
    document.defaultView.getComputedStyle(ch_container.value.$el).top,
    10
  )
  const startLeft = parseInt(
    document.defaultView.getComputedStyle(ch_container.value.$el).left,
    10
  )

  const doDrag = (e: MouseEvent) => {
    switch (direction) {
      case 'right':
        const SW = Math.max(400, startWidth + e.clientX - startX)
        ch_container.value.$el.style.width = SW + 'px'
        emit('update:sizes', { width: SW })
        break
      case 'bottom':
        const SH = Math.max(500, startHeight + e.clientY - startY)
        ch_container.value.$el.style.height = SH + 'px'
        emit('update:sizes', { height: SH })
        break
      case 'top':
        const newHeightTop = Math.max(500, startHeight - (e.clientY - startY))
        ch_container.value.$el.style.height = newHeightTop + 'px'
        if (newHeightTop > 500) {
          ch_container.value.$el.style.top =
            startTop + (e.clientY - startY) + 'px'
        }
        emit('update:sizes', { height: newHeightTop })
        break
      case 'left':
        const newWidthLeft = Math.max(400, startWidth - (e.clientX - startX))
        ch_container.value.$el.style.width = newWidthLeft + 'px'
        if (newWidthLeft > 400) {
          ch_container.value.$el.style.left =
            startLeft + (e.clientX - startX) + 'px'
        }
        emit('update:sizes', { width: newWidthLeft })
        break
    }
  }

  const stopDrag = () => {
    document.documentElement.removeEventListener('mousemove', doDrag, false)
    document.documentElement.removeEventListener('mouseup', stopDrag, false)
  }

  document.documentElement.addEventListener('mousemove', doDrag, false)
  document.documentElement.addEventListener('mouseup', stopDrag, false)
}

defineExpose({ show, handleSwipe })
</script>

<style module lang="scss">
.dialog {
  visibility: hidden !important;
  z-index: 99999 !important;
}
.q-card {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px !important;
  visibility: visible;
}
.container {
  border-radius: 15px;
}
.resizer {
  box-sizing: border-box;
  position: absolute;
  z-index: 99999;
  visibility: visible;

  &_top {
    top: -7px;
    width: 100%;
    height: 7px;
    cursor: row-resize;
  }

  &_bottom {
    bottom: -7px;
    width: 100%;
    height: 7px;
    cursor: row-resize;
  }

  &_left {
    left: -7px;
    height: 100%;
    width: 7px;
    cursor: col-resize;
  }

  &_right {
    right: -7px;
    height: 100%;
    width: 7px;
    cursor: col-resize;
  }
}
</style>
<style lang="scss">
.cursor-move {
  cursor: move;
}
</style>
