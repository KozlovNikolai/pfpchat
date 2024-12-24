import { ChatMessage } from './ChatMessage'

export class Chat {
  id: number
  name: string
  account_id: number
  chat_type: string
  last_message_id: number
  messages: ChatMessage[]
  users: number[]
  created_at: number
  updated_at: number

  constructor(data: {
    id: number
    name: string
    account_id: number
    chat_type: string
    last_message_id: number
    messages: ChatMessage[]
    users: number[]
    created_at: number
    updated_at: number
  }) {
    this.id = data.id
    this.account_id = data.account_id
    this.name = data.name
    this.chat_type = data.chat_type
    this.messages = data.messages
    this.users = data.users
    this.last_message_id = data.last_message_id
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }

  // get payloadFromSendMessage() {
  //   return {
  //     action: 'send-message',
  //     id: this.id,
  //     sender: this.sender,
  //     target: this.target,
  //     message: this.message,
  //   }
  // }
}

export interface ChatDetails {
  name: string
  chat_type: string
  last_msg_id: number
}
