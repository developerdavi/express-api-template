const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const settings = require('../Settings')

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    unique: true,
    type: String,
    minlength: 4,
    maxlength: 24
  },
  fullname: {
    required: true,
    type: String,
    minlength: 4,
    maxlength: 48
  },
  password: {
    required: true,
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'default'
  },
  tokens: [{
    token: {
      type: String,
      require: true
    }
  }]
}, {
  timestamps: true
})

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username })
  
  // CHECK IF USER EXISTS
  if (!user) 
    throw new Error({ error: 'User not found' })

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  // CHECK IF PASSWORD MATCHES THE HASH STORED IN DATABASE
  if (!isPasswordMatch)
    throw new Error({ error: 'Invalid password' })

  return user
}

userSchema.methods.generateAuthToken = async function() {
  const user = this

  // GENERATES JWT TOKEN
  const token = jwt.sign({ _id: user.id }, settings.JWT_KEY)

  // STORES TOKEN IN USER DATABASE ENTRY
  user.tokens = user.tokens.concat({ token })

  await user.save()

  // RETURNS THE TOKEN AS WELL
  return token
}

userSchema.pre('save', async function(next) {
  const user = this

  // CHECK IF THE PASSWORD HAS BEEN CREATED OR CHANGED
  if (user.isModified('password')) {
    // GENERATE A HASH TO SECURELY STORE PASSWORD
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('users', userSchema)

module.exports = User