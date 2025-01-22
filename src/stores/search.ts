import { defineStore } from 'pinia'
import { ChatUser } from 'src/models/ChatUser'

export const useUserFindStoreSM = defineStore('userFindSM', {
  state: () => ({
    users: [] as Array<ChatUser>,
  }),
  actions: {
    addUsers(newUsers: Array<ChatUser>) {
      this.users.push(...newUsers)
    },
    clearUsers() {
      this.users.length = 0
    },
  },
})
