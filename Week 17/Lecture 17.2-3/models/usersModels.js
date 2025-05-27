import { query } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const UserModel = {
  async create({ email, password, name }) {
    // to insert into the table
    try {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      );
      const { rows } = await query(
        `INSERT INTO users (email,password,name)
            VALUES ($1,$2,$3)
            RETURNING * `,
        [email, hashedPassword, name]
      );
      return rows[0];
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("Email already exists");
      }
      throw error;
    }
  },
  async findByEmail(email) {
    // to find a specific email
    try {
      const { rows } = await query(`SELECT id,email,password,name FROM users WHERE email = $1`, [
        email,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  async findById(id) {
    // to find a specific id

    const { rows } = await query(`SELECT id,email,name,role FROM users WHERE id = $1`, [id]);

    return rows[0];
  },

 
  generateToken(userId) { //static method
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
  },
async  verifyPassword(password, hashedPassword) { //instance  method
    return await bcrypt.compare(password, hashedPassword);
  },

  async updatePassword(userId,newPassword){
    const hashedNewPassword = await bcrypt.hash(
        newPassword,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
    )
    await query(`
        UPDATE users SET password = $1 WHERE id=$2`,[hashedNewPassword,userId])
  }
};

export default UserModel;
