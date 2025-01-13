import { defineStore } from 'pinia'
import axios from 'axios'
import { AuthState } from './../models/AuthState'
import { ChatSocket } from 'src/services/ChatSocket'
import { API_BASE_URL, API_WS_URL } from 'src/config/api'
import { useChatsStore } from 'src/stores/chat'
import { useCommonStore } from './common'
import { useUserStore } from './user'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userId: 0,
    login: '',
    account: '',
    name: '',
    surname: '',
    email: '',
    type: '',
    token: '',
    pubsubToken: '',
    status: 'disconnected',
    connected: false,
    socket: null,
  }),
  getters: {
    isConnected(state): boolean {
      return state.connected
    },
    getUser(state) {
      return state
    },
    getToken(state): string {
      return state.token
    },
    getPubsub(state): string {
      return state.pubsubToken
    },
    getAccount(state): string {
      return state.account
    },
    getEmail(state): string {
      return state.email
    },
    getStatus(state): string {
      return state.status
    },
    getFullName(state): string {
      return state.name + ' ' + state.surname
    },
  },
  actions: {
    async register(payload: {
      name: string
      surname: string
      email: string
      password: string
    }) {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        profile: 'email',
        login: payload.email,
        password: payload.password,
        name: payload.name,
        surname: payload.surname,
      })
      if (response.status === 201) {
        this.loginByEmail(payload)
      }
      // this.userId = response.data.user.id
      // this.login = response.data.user.login
      // this.account = response.data.user.account
      // this.name = response.data.user.name
      // this.surname = response.data.user.surname
      // this.email = response.data.user.email
      // this.type = response.data.user.type
      // this.token = response.data.token
      // this.pubsubToken = response.data.pubsub
      // this.status = response.data.user.status
      // this.connected = false
    },

    async loginByEmail(payload: { email: string; password: string }) {
      const response = await axios.post(`${API_BASE_URL}/signin`, {
        profile: 'email',
        login: payload.email,
        password: payload.password,
      })
      this.userId = response.data.user.id
      this.login = response.data.user.login
      this.account = response.data.user.account
      this.name = response.data.user.name
      this.surname = response.data.user.surname
      this.email = response.data.user.email
      this.type = response.data.user.type
      this.token = response.data.token
      this.pubsubToken = response.data.pubsub
      this.status = response.data.user.status
      this.connected = false

      this.socket = new ChatSocket(
        `${API_WS_URL}/subscribe/${this.pubsubToken}`
      )
      this.socket.connect()
      this.connected = true

      const userStore = useUserStore()
      const chats = useChatsStore()
      chats.getChats()
      chats.currentChatID = response.data.current_chat_id
      for (let i = 0; i < chats.chatsArray.length; i++) {
        userStore.getChatUsers(chats.chatsArray[i].id)
        console.log('get users for chat: ', chats.chatsArray[i].id)
      }
      const cStore = useCommonStore()
      cStore.moveTo('start')
    },

    async loginByToken(payload: { token: string }) {
      const response = await axios.get(`${API_BASE_URL}/sputnik/login`, {
        headers: { Authorization: `Bearer ${payload.token}` },
      })
      this.userId = response.data.user.id
      this.login = response.data.user.login
      this.account = response.data.user.account
      this.name = response.data.user.name
      this.surname = response.data.user.surname
      this.email = response.data.user.email
      this.type = response.data.user.type
      this.token = response.data.token
      this.pubsubToken = response.data.pubsub
      this.status = response.data.user.status
      this.connected = false

      this.socket = new ChatSocket(
        `${API_WS_URL}/subscribe/${this.pubsubToken}`
      )
      this.socket.connect()
      this.connected = true

      const userStore = useUserStore()
      const chats = useChatsStore()
      chats.getChats()
      chats.currentChatID = response.data.current_chat_id
      for (let i = 0; i < chats.chatsArray.length; i++) {
        userStore.getChatUsers(chats.chatsArray[i].id)
        console.log('get users for chat: ', chats.chatsArray[i].id)
      }
      const cStore = useCommonStore()
      cStore.moveTo('start')
    },

    async logout() {
      const response = await axios.get(
        `${API_BASE_URL}/auth/signout/${this.getPubsub}`,
        {
          headers: { Authorization: `Bearer ${this.getToken}` },
        }
      )
      // this.status = response.data.status
      // this.socket?.disconnect()
      // this.socket = null
      // this.connected = false

      this.userId = 0
      this.login = ''
      this.account = ''
      this.name = ''
      this.surname = ''
      this.email = ''
      this.type = ''
      this.token = ''
      this.pubsubToken = ''
      this.status = response.data.status
      this.connected = false
      this.socket?.disconnect()
      this.socket = null

      const chats = useChatsStore()
      chats.clear()
    },
  },
})
