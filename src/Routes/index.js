const express = require('express')

const publicRouter = require('./Public')
const privateRouter = require('./Private')

const authMiddleware = require('../Security/Authentication')

const routes = express.Router()

routes.use(publicRouter)
routes.use(authMiddleware)
routes.use(privateRouter)

module.exports = routes