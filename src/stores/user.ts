import { defineStore } from 'pinia'
import { ChatUser } from 'src/models/ChatUser'
import { useAuthStore } from './auth'
import axios from 'axios'
import { API_BASE_URL } from 'src/config/api'

export const useUserStore = defineStore('users', {
  state: () => ({
    users: new Map<number, ChatUser>(),
  }),
  actions: {
    // setUsers(users: ChatUser[]) {
    //   this.users = new Map(users.map((user) => [user.id, user]))
    // },
    setUsers(users: ChatUser[]) {
      for (const user of users) {
        this.users.set(user.id, user)
      }
    },
    clear() {
      this.users = new Map<number, ChatUser>()
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
    async getChatUsers(chatID: number) {
      const authStore = useAuthStore()
      const response = await axios.get(
        `${API_BASE_URL}/auth/usersByChat?chat_id=${chatID}`,
        {
          headers: { Authorization: `Bearer ${authStore.getToken}` },
        }
      )
      this.setUsers(response.data)
    },
    async reqGetUser(payload: { profile: string; login: string; id: number }) {
      const authStore = useAuthStore()
      const response = await axios.get(
        `${API_BASE_URL}/auth/user?profile=${payload.profile}&login=${payload.login}&id=${payload.id}`,
        {
          headers: { Authorization: `Bearer ${authStore.getToken}` },
        }
      )
      const us: ChatUser = {
        id: response.data.id,
        user_ext_id: response.data.user_ext_id,
        login: response.data.login,
        profile: response.data.profile,
        name: response.data.name,
        surname: response.data.surname,
        email: response.data.email,
        type: response.data.type,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
        status: response.data.status,
      }
      this.addUser(us)
    },
  },
})
