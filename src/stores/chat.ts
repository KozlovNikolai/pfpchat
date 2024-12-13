import { defineStore } from 'pinia'
import axios from 'axios'

interface Chat {
  id: number
  name: string
  chat_type: string
  last_message_id: number
}

interface Message {
  id: number
  sender_id: number
  text: string
  created_at: number
}

interface ChatState {
  chats: Chat[]
  messages: { [chatId: number]: Message[] }
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    chats: [],
    messages: {},
  }),
  actions: {
    async fetchChats(token: string) {
      const response = await axios.get('https://localhost:8443/auth/getChats', {
        headers: { Authorization: `Bearer ${token}` },
      })
      this.chats = response.data
    },
    async fetchMessages(chatId: number, token: string, offset: number = 0) {
      const response = await axios.post(
        'https://localhost:8443/auth/getmsgs',
        { chat_id: chatId, msg_type: 'nop', limit: 20, offset },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      this.messages[chatId] = response.data
    },
  },
})
