const DefaultController = {
  index: (_req, res) => {
    res.json({ success: true, data: 'Hello world' })
  },
  create: (req, res) => {
    // TODO: CREATE LOGIC
  },
  update: (req, res) => {
    // TODO: UPDATE LOGIC
  },
  delete: (req, res) => {
    // TODO: DELETE LOGIC
  }
}

module.exports = DefaultController