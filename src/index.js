const express = require('express')
const http = require('http')
const cors = require('cors')

const settings = require('./Settings')

const app = express()
const server = http.Server(app)

app.use(cors())

server.listen(settings.PORT, () => {
  console.log(`[ SERVER INFO ] RUNNING ON PORT ${settings.PORT}`)
})