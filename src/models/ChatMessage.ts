export class ChatMessage {
  id: number
  sender_id: number
  chat_id: number
  msg_type: string
  text: string
  is_deleted: boolean
  created_at: number
  updatest_at: number
  constructor(data: {
    id: number
    sender_id: number
    chat_id: number
    msg_type: string
    text: string
    is_deleted: boolean
    created_at: number
    updatest_at: number
  }) {
    this.id = data.id
    this.sender_id = data.sender_id
    this.chat_id = data.chat_id
    this.msg_type = data.msg_type
    this.text = data.text
    this.is_deleted = data.is_deleted
    this.created_at = data.created_at
    this.updatest_at = data.updatest_at
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
