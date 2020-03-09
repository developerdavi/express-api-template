const express = require('express')
const http = require('http')
const cors = require('cors')
const moment = require('moment')
const dotenv = require('dotenv')

// LOAD .ENV SETTINGS
dotenv.config()

const database = require('./Services/Database')
const settings = require('./Settings')
const routes = require('./Routes')

const app = express()
const server = http.Server(app)

function log(msg) {
  console.log(`[${moment().format('HH:mm:ss')}] ${msg}`)
}

// START DATABASE SERVICE
database.connect()

app.use((req, _res, next) => {
  log(`${req.method} ${req.path}`)

  next()
})

// ADDS CORS HEADER
app.use(cors())

// HANDLES JSON REQUEST BODY
app.use(express.json())

// USES DEFINED ROUTES
app.use(routes)

server.listen(settings.PORT, () => {
  console.log(`[ SERVER INFO ] RUNNING ON PORT ${settings.PORT}`)
})