const User = require('../Models/User')

const UserController = {
  index: async (req, res) => {
    const data = await User.find(req.query).lean()
    
    // REMOVE SENSITIVE DATA FROM LIST
    const users = data.map(user => {
      return { ...user, password: undefined, tokens: undefined } 
    })
    
    return res.json({ success: true, data: users })
  },
  create: async (req, res) => {
    try {
      const user = new User(req.body)

      await user.save()

      const token = await user.generateAuthToken()

      res.status(201).json({ success: true, data: { user, token } })
    } catch (error) {
      res.status(400).json({ success: false, error: error })
    }
  },
  update: (req, res) => {
    // TODO: UPDATE LOGIC
  },
  delete: (req, res) => {
    // TODO: DELETE LOGIC
  },
  login: (req, res) => {
    // TODO: LOGIN LOGIC
  }
}

module.exports = UserController