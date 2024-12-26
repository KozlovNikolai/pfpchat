import { defineStore } from 'pinia'

type Path = 'auth' | 'chat' | 'start' | 'scroll'

type CommonStore = {
  path: Path
}

export const useCommonStore = defineStore('common', {
  state: (): CommonStore => ({
    path: 'start',
  }),
  actions: {
    moveTo(to: Path) {
      this.path = to
    },
  },
})
