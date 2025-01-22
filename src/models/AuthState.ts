import { ChatSocket } from 'src/services/ChatSocket'

export class AuthState {
  userId: number
  profile: string
  login: string
  account: string
  name: string
  surname: string
  email: string
  type: string
  token: string
  pubsubToken: string
  status: string
  connected: boolean
  socket: ChatSocket | null
  lastOnline: number

  constructor(data: {
    userId: number
    profile: string
    login: string
    account: string
    name: string
    surname: string
    email: string
    type: string
    token: string
    pubsubToken: string
    status: string
    connected: boolean
    socket: ChatSocket
    lastOnline: number
  }) {
    this.userId = data.userId
    this.profile = data.profile
    this.name = data.name
    this.login = data.login
    this.account = data.account
    this.name = data.name
    this.surname = data.surname
    this.email = data.email
    this.type = data.type
    this.token = data.token
    this.pubsubToken = data.pubsubToken
    this.status = data.status
    this.connected = data.connected
    this.socket = data.socket
    this.lastOnline = data.lastOnline
  }
  // get getAvatar() {
  //   return null
  // }
  // get payloadFromSendMessage() {
  //   return {
  //     action: 'send-message',
  //     id: this.id,
  //     sender: this.sender,
  //     target: this.target,
  //     message: this.status,
  //   }
  // }
}
