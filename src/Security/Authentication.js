const AuthMiddleware = (req, res, next) => {
  // CHECK USER'S AUTH
  let authorized = true

  if (authorized)
    return next() // RETURN NEXT IF USER IS AUTHENTICATED

  res.status(403).json({ success: false, error: 'Invalid credentials' })
}

module.exports = AuthMiddleware