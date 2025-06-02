import { updateUser, deleteUser, getAllUsers, findUserById } from '../models/userModel.js';
import { sanitizeUser, createResponse } from '../utils/helpers.js';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json(
        createResponse(false, 'User not found', null, 'User does not exist')
      );
    }
    
    const sanitizedUser = sanitizeUser(user);
    return res.json(
      createResponse(true, 'Profile retrieved successfully', sanitizedUser)
    );
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json(
      createResponse(false, 'Server error', null, error.message)
    );
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const userId = req.user.id;
    
    const updatedUser = await updateUser(userId, { name, avatar });
    
    if (!updatedUser) {
      return res.status(404).json(
        createResponse(false, 'User not found', null, 'User does not exist')
      );
    }
    
    const sanitizedUser = sanitizeUser(updatedUser);
    return res.json(
      createResponse(true, 'Profile updated successfully', sanitizedUser)
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json(
      createResponse(false, 'Server error', null, error.message)
    );
  }
};

// Delete user account
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const deletedUser = await deleteUser(userId);
    
    if (!deletedUser) {
      return res.status(404).json(
        createResponse(false, 'User not found', null, 'User does not exist')
      );
    }
    
    // Logout user after deletion
    req.logout((err) => {
      if (err) {
        console.error('Logout after deletion error:', err);
      }
      
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destroy error:', err);
        }
        
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.clearCookie('sessionId');
        
        return res.json(
          createResponse(true, 'Account deleted successfully')
        );
      });
    });
  } catch (error) {
    console.error('Delete account error:', error);
    return res.status(500).json(
      createResponse(false, 'Server error', null, error.message)
    );
  }
};

// Get all users (admin function)
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const users = await getAllUsers(limit, offset);
    const sanitizedUsers = users.map(sanitizeUser);
    
    return res.json(
      createResponse(true, 'Users retrieved successfully', {
        users: sanitizedUsers,
        pagination: {
          current_page: page,
          per_page: limit,
          total_items: users.length
        }
      })
    );
  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json(
      createResponse(false, 'Server error', null, error.message)
    );
  }
};