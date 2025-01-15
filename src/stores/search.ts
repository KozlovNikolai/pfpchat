import { defineStore } from 'pinia'
import { ChatUser } from 'src/models/ChatUser'

export const useUserFindStore = defineStore('user', {
  state: () => ({
    users: [] as Array<{ id: number; name: string }>,
  }),
  actions: {
    // addUsers(newUsers: Array<{ id: number; name: string }>) {
    addUsers(newUsers: Array<ChatUser>) {
      this.users.push(...newUsers)
    },
    clearUsers() {
      this.users = []
    },
  },
})
