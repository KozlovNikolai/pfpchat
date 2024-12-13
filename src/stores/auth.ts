import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  id: number
  name: string
  surname: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  pubsubToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    pubsubToken: null,
  }),
  actions: {
    async register(payload: {
      name: string
      surname: string
      email: string
      password: string
    }) {
      const response = await axios.post('https://localhost:8443/signup', {
        account: 'email',
        login: payload.email,
        password: payload.password,
        name: payload.name,
        surname: payload.surname,
      })
      this.user = response.data.user
      this.token = response.data.token
    },
    async login(payload: { email: string; password: string }) {
      const response = await axios.post('http://localhost:8443/signin', {
        account: 'email',
        login: payload.email,
        password: payload.password,
      })
      this.user = response.data.user
      this.token = response.data.token
      this.pubsubToken = response.data.pubsub

      console.log('login: ', this.user?.email)
      console.log('token: ', this.token)
      console.log('pubsubToken: ', this.pubsubToken)
    },
    async logout() {
      await axios.get('https://localhost:8443/auth/signout', {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      this.user = null
      this.token = null
      this.pubsubToken = null
    },
  },
})
