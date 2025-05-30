import { query } from "../config/db.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Usermodel = {
  //do we put them under an object so we can just call it all at once?
  async create({ email, password, name }) {
    const hashed = await bycrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS)
    ); //i want a live thing about salt rounds
    const { rows } = await query(
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *",
      [email, hashed, name]
    );
    return rows[0];
  },

  async findByEmail(email) {
    const { rows } = await query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0];
  },

  async findById(id) {
    const { rows } = await query(
      "SELECT id, email, username FROM users WHERE id = $1", // Changed name to username to match the create method
      [id]
    );
    return rows[0];
  },

  generateToken(userId) {
    //where did we get the userId?
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
  },

  async verifyPassword(password, hash) { //when we type verify it adds it in the import jwt which give an error 
    return await bycrypt.compare(password, hash);
  },
};

export default Usermodel;