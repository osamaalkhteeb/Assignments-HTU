import express from 'express';
import {
  getProfile,
  updateProfile,
  deleteAccount,
  getUsers
} from '../controllers/userController.js';
import { isAuthenticated, authenticateJWT } from '../middleware/auth.js';
import { validateUserProfile } from '../middleware/validation.js';

const router = express.Router();

// User profile routes (session-based authentication)
router.get('/profile', isAuthenticated, getProfile);
router.put('/profile', isAuthenticated, validateUserProfile, updateProfile);
router.delete('/account', isAuthenticated, deleteAccount);

// JWT-based routes
router.get('/profile-jwt', authenticateJWT, getProfile);
router.put('/profile-jwt', authenticateJWT, validateUserProfile, updateProfile);

// Admin routes
router.get('/all', isAuthenticated, getUsers);

export default router;