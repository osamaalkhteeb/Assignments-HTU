import jwt from 'jsonwebtoken';
import { findUserById } from '../models/userModel.js';
import { createResponse } from '../utils/helpers.js';

// Check if user is authenticated (session-based)
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  
  return res.status(401).json(
    createResponse(false, 'Authentication required', null, 'User not authenticated')
  );
};

// JWT authentication middleware
export const authenticateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json(
        createResponse(false, 'Access token required', null, 'No token provided')
      );
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);
    
    if (!user) {
      return res.status(401).json(
        createResponse(false, 'Invalid token', null, 'User not found')
      );
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json(
      createResponse(false, 'Invalid token', null, error.message)
    );
  }
};

// Optional JWT authentication (doesn't fail if no token)
export const optionalJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await findUserById(decoded.id);
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};