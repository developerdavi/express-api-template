const express = require('express')
const http = require('http')
const cors = require('cors')

const settings = require('./Settings')
const routes = require('./Routes')
const authMiddleware = require('./Security/Authentication')

const app = express()
const server = http.Server(app)

app.use(cors())

app.use(routes.public)
app.use(authMiddleware)
app.use(routes.private)

server.listen(settings.PORT, () => {
  console.log(`[ SERVER INFO ] RUNNING ON PORT ${settings.PORT}`)
})