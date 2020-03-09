const permit = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return (req, res, next) => {
    // CHECK USER'S PERMISSIONS
    if (roles.length && !roles.includes(req.user.role))
      return res.status(403).json({ success: false, error: 'User not allowed to access this resource' })
    
    next() // RETURN NEXT IF USER HAS ACCESS TO RESOURCE
  }
}

module.exports = permit