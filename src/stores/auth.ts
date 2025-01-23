import { defineStore } from 'pinia'
import axios from 'axios'
import { AuthState } from './../models/AuthState'
import { ChatSocket } from 'src/services/ChatSocket'
import { API_BASE_URL, API_WS_URL } from 'src/config/api'
import { useChatsStoreSM } from 'src/stores/chat'
import { useCommonStoreSM } from './common'
import { useUserStoreSM } from './user'
import { ChatUser } from 'src/models/ChatUser'

const userStore = useUserStoreSM()
const chats = useChatsStoreSM()

export const useAuthStoreSM = defineStore('authSM', {
  state: (): AuthState => ({
    userId: 0,
    profile: '',
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
    lastOnline: 0,
  }),
  getters: {
    getProfileUser(state): ChatUser {
      return {
        id: state.userId,
        user_ext_id: 0,
        login: state.login,
        profile: state.profile,
        name: state.name,
        surname: state.surname,
        email: state.email,
        type: state.type,
        created_at: 0,
        updated_at: 0,
        status: state.status,
        lastOnline: state.lastOnline,
      }
    },
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
    getContactDetailConfig(state) {
      return [
        { name: '(888) 8888-8888', icon: 'sym_o_phone' },
        { name: state.email, icon: 'sym_o_mail' },
      ]
    },
    getAvatar() {
      return null
    },
  },
  actions: {
    async register(payload: {
      name: string
      surname: string
      email: string
      password: string
    }) {
      await axios
        .post(`${API_BASE_URL}/signup`, {
          profile: 'email',
          login: payload.email,
          password: payload.password,
          name: payload.name,
          surname: payload.surname,
        })
        .then((response) => {
          if (response.status === 201) {
            this.loginByEmail(payload)
          }
        })

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
      await axios
        .post(`${API_BASE_URL}/signin`, {
          profile: 'email',
          login: payload.email,
          password: payload.password,
        })
        .then((response) => {
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
          this.lastOnline = response.data.user.last_online

          this.socket = new ChatSocket(
            `${API_WS_URL}/subscribe/${this.pubsubToken}`
          )
          this.socket.connect()
          this.connected = true

          const userStore = useUserStoreSM()
          const chats = useChatsStoreSM()
          chats.getChats().then(() => {
            chats.currentChatID = response.data.current_chat_id
            for (let i = 0; i < chats.chatsArray.length; i++) {
              userStore.getChatUsers(chats.chatsArray[i].id)
              console.log('get users for chat: ', chats.chatsArray[i].id)
            }
          })
          const cStore = useCommonStoreSM()
          cStore.moveTo('start')
        })
    },

    async loginByToken(payload: { token: string }) {
      await axios
        .get(`${API_BASE_URL}/sputnik/login`, {
          headers: { Authorization: `Bearer ${payload.token}` },
        })
        .then((response) => {
          this.userId = response.data.user.id
          this.profile = response.data.user.profile
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
          this.lastOnline = response.data.user.last_online

          this.socket = new ChatSocket(
            `${API_WS_URL}/subscribe/${this.pubsubToken}`
          )
          this.socket.connect()
          this.connected = true

          chats.getChats().then(() => {
            chats.currentChatID = response.data.current_chat_id

            console.log('lenght chat list:', chats.chatsArray.length)
            for (let i = 0; i < chats.chatsArray.length; i++) {
              userStore.getChatUsers(chats.chatsArray[i].id)
              console.log('get users for chat: ', chats.chatsArray[i].id)
            }
          })

          const cStore = useCommonStoreSM()
          cStore.moveTo('start')
        })
    },

    async logout() {
      await axios
        .get(`${API_BASE_URL}/auth/signout/${this.getPubsub}`, {
          headers: { Authorization: `Bearer ${this.getToken}` },
        })
        .then((response) => {
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
          this.lastOnline = 0

          const chats = useChatsStoreSM()
          chats.clear()
        })
    },
  },
})
