const express = require('express')
const publicRouter = express.Router()

// CONTROLLERS
const UserController = require('../Controllers/User')

// USERS
publicRouter.get('/users', UserController.index)
publicRouter.post('/user', UserController.create)

module.exports = publicRouter