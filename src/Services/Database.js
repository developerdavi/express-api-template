const mongoose = require('mongoose')

const settings = require('../Settings')

module.exports = {
  connect: () => {
    mongoose.connect(`mongodb://localhost:27017/${settings.DB_NAME}`, {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    }).then(() => {
      console.log('[ SERVER INFO ] DATABASE CONNECTED')
    })
  }
}