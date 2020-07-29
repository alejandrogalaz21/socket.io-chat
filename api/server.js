import dotenv from 'dotenv'
import http from 'http'
import express from 'express'
import chalk from 'chalk'
import appRoot from 'app-root-path'
import path from 'path'
import socketIo from 'socket.io'

dotenv.config()

const config = dotenv.config()

if (config.error) {
  throw config.error
}

console.log(config.parsed)

const app = express()
const ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const server = http.Server(app)
const io = socketIo(server)

io.on('connection', socket => {
  console.log(chalk.blue(`new connection ${socket.id}`))
})

if (ENV === 'development') {
  app.use(express.static(`${appRoot}/dist`))
  app.get('/', (req, res) => {
    res.sendFile(path.join(`${appRoot}/dist`, 'index.html'))
  })
}

server.listen(PORT, async () => {
  console.log(chalk.green('server started :'))
})
