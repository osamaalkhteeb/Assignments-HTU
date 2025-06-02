import { pool } from '../config/database.js';

// Find user by Google ID
export const findUserByGoogleId = async (googleId) => {
  try {
    const query = 'SELECT * FROM users WHERE google_id = $1';
    const result = await pool.query(query, [googleId]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error finding user by Google ID:', error);
    throw error;
  }
};

// Find user by ID
export const findUserById = async (id) => {
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
};

// Find user by email
export const findUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

// Create new user
export const createUser = async (userData) => {
  try {
    const { google_id, email, name, avatar, provider } = userData;
    const query = `
      INSERT INTO users (google_id, email, name, avatar, provider)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [google_id, email, name, avatar, provider];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update user
export const updateUser = async (id, userData) => {
  try {
    const { name, avatar } = userData;
    const query = `
      UPDATE users 
      SET name = COALESCE($2, name), 
          avatar = COALESCE($3, avatar),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const values = [id, name, avatar];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Get all users (admin function)
export const getAllUsers = async (limit = 50, offset = 0) => {
  try {
    const query = `
      SELECT id, email, name, avatar, provider, is_verified, created_at, updated_at
      FROM users 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};