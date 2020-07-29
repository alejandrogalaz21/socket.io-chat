import './styles.css'
import $ from 'jquery'
import io from 'socket.io-client'

const messageTemplate = ({ id }, message) => `<li>${id} : ${message}</li>`

const socket = io()
let room, name

$('#name-form').submit(function () {
  name = $('#m1').val()
  socket.emit('setUserName', name)
  $('.name').hide()
  $('.rooms').show()
  $('#room').text(`Rooms - (${name})`)
  return false
})

$('#room-form').submit(function () {
  room = $('#m2').val()
  socket.emit('newRoom', room)
  $('#m2').val('')
  $('.rooms').hide()
  $('.msgs').show()
  $('#room').text(room)
  return false
})

$('#msg-form').submit(function () {
  socket.emit('chatMessage', { name, room, msg: $('#m3').val() })
  $('#m3').val('')
  return false
})

socket.on('chatMessage', function (msg) {
  console.log(msg)
  $('#messages').append($('<li>').text(msg))
})

socket.on('rooms', function (rooms) {
  try {
    $('#room-list').html('')
    if (rooms !== undefined && Object.getOwnPropertyNames(rooms).length > 0) {
      for (let room in rooms) {
        const sockets = rooms[room]
        let txt = `${room} - ` + sockets.join(', ')
        let li = $('#room-list').append($('<li>').append($(`<a name="${room}">`).text(txt)))
      }
    }
    $('#room-list a').click(function () {
      console.log(`Room ${this.name} clicked.`)
      socket.emit('joinRoom', this.name)
      room = this.name
      $('.rooms').hide()
      $('.msgs').show()
      $('#room').text(room)
    })
  } catch (e) {
    console.log('There was an error getting the room list')
  }
})
