const jwt = require('jsonwebtoken');
require('dotenv').config();


// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to verify JWT Token
const verifyToken = (req, res, next) => {
  const jwtCookie = req.headers.cookie;

  if (!jwtCookie) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = jwtCookie.split('=')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token is not valid' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { generateToken, verifyToken };