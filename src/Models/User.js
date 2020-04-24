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
  
  if (!user) 
    throw new Error({ error: 'User not found' })

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch)
    throw new Error({ error: 'Invalid password' })

  return user
}

userSchema.methods.generateAuthToken = async function() {
  const user = this

  const token = jwt.sign({ _id: user.id }, settings.JWT_KEY)

  user.tokens = user.tokens.concat({ token })

  await user.save()

  return token
}

userSchema.pre('save', async function(next) {
  const user = this

  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 8)

  next()
})

const User = mongoose.model('users', userSchema)

module.exports = User