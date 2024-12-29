
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure you have the correct path for your User model

// Protect middleware to verify JWT token
const protect = async (req, res, next) => {
  let token;

  // Check if the request has an Authorization header with the Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from the Authorization header
      token = req.headers.authorization.split(' ')[1]; // 'Bearer <token>'

      // Verify the token and decode it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request object, exclude the password field
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware or route handler
      return next();
    } catch (error) {
      console.error('Token verification failed:', error);

      // Handle the case where the token has expired
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired. Please log in again.' });
      }

      // Handle the case where the token is invalid
      return res.status(401).json({ message: 'Not authorized, invalid token.' });
    }
  }

  // If no token is provided in the Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided.' });
  }
};

module.exports = protect;
