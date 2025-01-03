import { useAuthStore } from 'src/stores/auth'

export class ChatSocket {
  private socket?: WebSocket
  private url: string

  constructor(url: string) {
    this.url = url
  }

  // connect(token: string) {
  connect() {
    console.log('connecting start')
    console.log(`socket: ${this.socket}`)
    console.log(`ready State: ${this.socket?.readyState}`)
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.warn('WebSocket уже подключен')
      return
    }

    this.socket = new WebSocket(this.url)

    this.socket.onopen = () => {
      console.info('WebSocket подключен')
      // this.authenticate(token)
    }

    this.socket.onmessage = (event) => {
      this.handleMessage(event.data)
    }

    this.socket.onerror = (error) => {
      console.error('WebSocket ошибка:', error)
    }

    this.socket.onclose = () => {
      const authStore = useAuthStore()
      authStore.logout
      //this.disconnect()
      console.warn('WebSocket отключен')
    }
  }

  // private authenticate(token: string) {
  //   this.sendMessage({
  //     action: 'auth',
  //     token,
  //   })
  // }

  sendMessage(data: Record<string, unknown>) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data))
    } else {
      console.error('WebSocket не подключен')
    }
  }

  private handleMessage(rawMessage: string) {
    try {
      const message = JSON.parse(rawMessage)

      switch (message.action) {
        case 'new-message':
          // this.handleNewMessage(message)
          break

        default:
          console.warn('Неизвестное действие:', message.action)
      }
    } catch (error) {
      console.error('Ошибка обработки сообщения:', error)
    }
  }

  // private handleNewMessage(data: any) {
  //   const chatStore = useChatStore()
  //   // const notifyStore = useNotifyStore()

  //   const newMessage = new ChatMessage(data)
  //   chatStore.addMessage(newMessage)

  //   // notifyStore.sendAcceptNotify(`Новое сообщение от ${data.senderName}`)
  // }

  disconnect() {
    if (this.socket) {
      this.socket.close()
    }
  }
}
