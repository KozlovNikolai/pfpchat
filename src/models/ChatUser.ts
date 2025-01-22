export class ChatUser {
  id: number
  user_ext_id: number
  login: string
  profile: string
  name: string
  surname: string
  email: string
  type: string
  created_at: number
  updated_at: number
  status: string
  lastOnline: number

  constructor(data: {
    id: number
    user_ext_id: number
    login: string
    profile: string
    name: string
    surname: string
    email: string
    type: string
    created_at: number
    updated_at: number
    status: string
    lastOnline: number
  }) {
    this.id = data.id
    this.user_ext_id = data.user_ext_id
    this.login = data.login
    this.profile = data.profile
    this.name = data.name
    this.surname = data.surname
    this.email = data.email
    this.type = data.type
    this.created_at = data.created_at
    this.updated_at = data.updated_at
    this.status = data.status
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
