import dotenv from 'dotenv'
import http from 'http'
import express from 'express'
import chalk from 'chalk'
import appRoot from 'app-root-path'
import path from 'path'

dotenv.config()

const config = dotenv.config()

if (config.error) {
  throw config.error
}

console.log(config.parsed)

const app = express()
const PORT = process.env.PORT
const server = http.Server(app)

app.get('/', (req, res) => {
  res.sendFile(path.join(`${appRoot}/public`, 'index.html'))
})

server.listen(PORT, async () => {
  console.log(chalk.green('server started :'))
})
