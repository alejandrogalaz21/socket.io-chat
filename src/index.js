import './styles.css'
import $ from 'jquery'
import io from 'socket.io-client'

const socket = io()

socket.on('connect', connection => {
  console.log(`client connected ${socket.id}`)
})
