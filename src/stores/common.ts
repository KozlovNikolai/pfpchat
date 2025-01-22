import { defineStore } from 'pinia'
import { sizeWindowParams } from 'src/models/common/types'

export type Path = 'auth' | 'chat' | 'start' | 'scroll' | 'search'

export interface CommonStore {
  path: Path
  isOpen: boolean
  isMiniMode: boolean
  dialogSize: sizeWindowParams
}

export const useCommonStoreSM = defineStore('commonSM', {
  state: (): CommonStore => ({
    path: 'start',
    isOpen: false,
    isMiniMode: false,
    dialogSize: {
      height: 800,
      width: 1200,
    },
  }),
  getters: {
    getIsMiniMode: (state) => state.isMiniMode,
    getDialogWidth: (state) => state.dialogSize.width,
    getDialogHeight: (state) => state.dialogSize.height,
    getPath: (state) => state.path,
  },
  actions: {
    moveTo(to: Path) {
      this.path = to
    },
    setIsOpen(v: boolean) {
      this.isOpen = v
    },
    updateDialogSize(dialogSize: sizeWindowParams) {
      this.dialogSize = { ...this.dialogSize, ...dialogSize }
      this.isMiniMode = this.dialogSize.width <= 600
    },
  },
})
