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
      console.log('GET CHATS ARRAY')
      return Array.from(state.chats.entries()).map(([chatID, value]) => ({
        id: chatID,
        name: value.name,
        account_id: value.account_id,
        chat_type: value.chat_type,
        last_message_id: value.last_message_id,
        messages: value.messages,
        users: value.users,
        created_at: value.created_at,
        updated_at: value.updated_at,
      }))
    },
    getChatByID: (state) => {
      return (id: number) => {
        return state.chats.get(id)
      }
    },
    getChatByName: (state) => {
      return (name: string): Chat | undefined => {
        for (const [key, value] of state.chats.entries()) {
          if (name === value.name) {
            return state.chats.get(key)
          }
        }
        return undefined
      }
    },
  },
  actions: {
    setChats(chats: Chat[]) {
      this.chats = new Map(chats.map((chat) => [chat.id, chat]))
    },
    clear() {
      this.chats = new Map<number, Chat>()
    },

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
    async getChatMessages(req: {
      chatID: number
      initMsgID: number
      before: number
      after: number
    }) {
      const authStore = useAuthStore()
      const response = await axios.post(
        `${API_BASE_URL}/auth/getchatmsgs`,
        {
          chat_id: req.chatID,
          initial_msg_id: req.initMsgID,
          before: req.before,
          after: req.after,
        },
        {
          headers: { Authorization: `Bearer ${authStore.getToken}` },
        }
      )
      const messages = response.data
      const chat = this.chats.get(req.chatID)
      if (chat) {
        if (!chat.messages) {
          chat.messages = []
        }
        const existingMessageIds = new Set(
          chat.messages.map((message) => message.id)
        )
        for (const message of messages) {
          if (!existingMessageIds.has(message.id)) {
            chat.messages.push(message)
            existingMessageIds.add(message.id)
          }
        }

        chat.messages.sort((a, b) => a.id - b.id)
      } else {
        console.error(`Chat with ID ${req.chatID} not found.`)
      }
    },
    async sendMessageToChat(req: {
      chatID: number
      text: string
      msgType: string
    }) {
      const authStore = useAuthStore()
      const response = await axios.post(
        `${API_BASE_URL}/auth/sendmsg`,
        {
          chat_id: req.chatID,
          text: req.text,
          msg_type: req.msgType,
        },
        {
          headers: { Authorization: `Bearer ${authStore.getToken}` },
        }
      )
      const resp = response.data

      if (resp === 'message sent') {
        console.log(`Message sent to Chat with ID ${req.chatID}.`)
      } else {
        console.error(`Message not send to chat with ID ${req.chatID}.`)
      }
    },
    async createPrivateChat(req: { user_two_id: number }) {
      const authStore = useAuthStore()
      const response = await axios.post(
        `${API_BASE_URL}/auth/createPrivateChat`,
        {
          user_two_id: req.user_two_id,
        },
        {
          headers: { Authorization: `Bearer ${authStore.getToken}` },
        }
      )
      const resp = response.data

      if (resp.status === 201) {
        console.log(`New private chat created with ID ${resp.id}.`)
      } else {
        console.error(
          `New private chat NOT created with status ${resp.status}.`
        )
      }
    },
  },
})

// setMessages(chatID: number, messages: ChatMessage[]) {
//   this.chats = new Map(chats.map((chat) => [chat.id, chat]))
// },

// /** @type {{ id: number, name: string, chat_type: string }} */
// chatDetails: { id: 0, name: '', chat_type: '' },

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
