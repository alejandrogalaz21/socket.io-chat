import './styles.css'
import $ from 'jquery'
import io from 'socket.io-client'

const socket = io()

socket.on('connect', connection => {
  console.log(`client connected ${socket.id}`)
})

const form = $('form')
const messageInput = $('#m')
const messages = $('#messages')

const messageTemplate = ({ id }, message) => `<li>${id} : ${message}</li>`

form.submit(function (e) {
  e.preventDefault()
  const message = messageInput.val()
  console.log(`message send it : ${message}`)

  socket.emit('chatMessage', message)
  messageInput.val('')

  return false
})

socket.on('chatMessage', message => {
  console.log(`message received ${message}`)
  messages.append(messageTemplate(socket, message))
})
