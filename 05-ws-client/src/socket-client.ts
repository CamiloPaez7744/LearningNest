import { Manager, Socket } from 'socket.io-client'

export const connectToServer = () => {
    const url = 'http://localhost:3000/socket.io/socket.io.js'
  const manager = new Manager(url)

  const socket = manager.socket('/')
  addListeners(socket)
}

const addListeners = (socket: Socket) => {
  socket.on('connect', () => {
    console.log('Connected to server')
    document.querySelector<HTMLSpanElement>('#server-status')!.textContent = 'Online'
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
    document.querySelector<HTMLSpanElement>('#server-status')!.textContent = 'Offline'
  })

  socket.on('clients-updated', (clients: any[]) => {
    console.log('Clients updated:', clients)
    const clientsList = document.querySelector<HTMLUListElement>('#clients-list')!
    clientsList.innerHTML = ''
    clients.forEach(clientId => {
      console.log('Client ID:', clientId)
      const li = document.createElement('li')
      li.textContent = clientId
      clientsList.appendChild(li)
    })
  })

  document.querySelector<HTMLFormElement>('#message-form')!.addEventListener('submit', (event) => {
    event.preventDefault()
    const input = document.querySelector<HTMLInputElement>('#message-input')!
    const message = input.value.trim()
    if (message) {
      socket.emit('message', message)
      input.value = ''
    }
  })
}