import { defineStore } from 'pinia'
// import { ChatMessage } from 'src/models/ChatMessage'
// import { ChatUser } from 'src/models/ChatUser'
import { Chat } from 'src/models/Chat'
import { useAuthStore } from './auth'
import axios from 'axios'
import { API_BASE_URL } from 'src/config/api'

export const useChatsStore = defineStore('chats', {
  state: () => ({
    currentChatID: 0 as number,
    chats: new Map<number, Chat>(),
  }),
  getters: {
    chatsArray: (state): Chat[] => {
      return Array.from(state.chats.entries()).map(([chatID, value]) => ({
        id: chatID,
        name: value.name, // Можно заменить на реальное значение email
        account_id: value.account_id,
        chat_type: value.chat_type,
        last_message_id: value.last_message_id,
        messages: value.messages,
        users: value.users,
        created_at: value.created_at,
        updated_at: value.updated_at,
      }))
    },
    getChat: (state) => {
      return (id: number) => {
        return state.chats.get(id)
      }
    },
  },
  actions: {
    setChats(chats: Chat[]) {
      this.chats = new Map(chats.map((chat) => [chat.id, chat]))
    },
    // setMessages(chatID: number, messages: ChatMessage[]) {
    //   this.chats = new Map(chats.map((chat) => [chat.id, chat]))
    // },
    clear() {
      this.chats = new Map<number, Chat>()
    },
    // async enterToChat(chatid: number) {
    //   const authStore = useAuthStore()
    //   if (!authStore.isConnected) {
    //     //   await axios.get(
    //     //     `http://localhost:8443/auth/enter/${authStore.getPubsub}?chat_id=${chatid}`,
    //     //     {
    //     //       headers: { Authorization: `Bearer ${authStore.getToken}` },
    //     //     }
    //     //   )
    //     //   this.setUsers(response.data)
    //   }
    //   // this.socket.connect()
    // },

    // addUser(user: ChatUser) {
    //   if (!this.users.has(user.id)) {
    //     this.users.set(user.id, user)
    //   } else {
    //     console.warn(`User with ID ${user.id} already exists.`)
    //   }
    // },

    // addMessage(message: ChatMessage) {
    //   this.messages.push(message)
    // },

    // sendMessage(content: string) {
    //   if (!this.socket) {
    //     console.error('WebSocket не подключен')
    //     return
    //   }

    //   this.socket.sendMessage({
    //     action: 'send-message',
    //     content,
    //   })
    // },
    async getChats() {
      const authStore = useAuthStore()
      const response = await axios.get(`${API_BASE_URL}/auth/getChats`, {
        headers: { Authorization: `Bearer ${authStore.getToken}` },
      })
      this.setChats(response.data)
    },

    async getChat(chatID: number) {
      const authStore = useAuthStore()
      const response = await axios.get(
        `${API_BASE_URL}/auth/enter/${authStore.getPubsub}?chat_id=${chatID}`,
        {
          headers: { Authorization: `Bearer ${authStore.getToken}` },
        }
      )

      if (Array.isArray(response.data)) {
        const userIds = response.data
          .filter((usr: { id: number }) => usr.id != authStore.getUser.userId)
          .map((usr) => usr.id)

        const chat = this.chats.get(chatID)
        if (chat) chat.users = userIds
      }
    },
  },
})

// /** @type {{ id: number, name: string, chat_type: string }} */
// chatDetails: { id: 0, name: '', chat_type: '' },
