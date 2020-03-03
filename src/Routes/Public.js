const express = require('express')
const publicRouter = express.Router()

// CONTROLLERS
const DefaultController = require('../Controllers/Default')

publicRouter.get('/', DefaultController.index)

module.exports = publicRouter