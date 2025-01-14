// src/store/storage.ts
import { defineStore } from 'pinia'

export const useLocalStore = defineStore('localStorage', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('items') || '[]') as Array<{
      id: number
      value: string
    }>,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token) // Сохранение токена в локальное хранилище
    },
    clearToken() {
      this.token = ''
      localStorage.removeItem('token') // Удаление токена из локального хранилища
    },
    addItem(value: string) {
      const newItem = { id: Date.now(), value }
      this.items.push(newItem)
      this.save()
    },
    removeItem(id: number) {
      this.items = this.items.filter((item) => item.id !== id)
      this.save()
    },
    clearItems() {
      this.items = []
      localStorage.removeItem('items')
    },
    save() {
      localStorage.setItem('items', JSON.stringify(this.items))
    },
  },
})
