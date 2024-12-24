import { defineStore } from 'pinia'
import { ChatUser } from 'src/models/ChatUser'

export const useUserStore = defineStore('users', {
  state: () => ({
    users: new Map<number, ChatUser>(),
  }),
  actions: {
    setUsers(users: ChatUser[]) {
      this.users = new Map(users.map((user) => [user.id, user]))
    },

    addUser(user: ChatUser) {
      if (!this.users.has(user.id)) {
        this.users.set(user.id, user)
      } else {
        console.warn(`User with ID ${user.id} already exists.`)
      }
    },

    getUserByID(id: number): ChatUser | undefined {
      return this.users.get(id)
    },
  },
})
