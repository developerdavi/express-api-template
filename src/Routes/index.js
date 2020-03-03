const privateRouter = require('./Private')
const publicRouter = require('./Public')

const routes = {
  private: privateRouter,
  public: publicRouter
}

module.exports = routes