import pool from "../config/db.js";

// Create

export const createUser = async (req, res) => {
  const { email, name, phonenum, gender, address } = req.body;
  try {
    await pool.query(
      "INSERT INTO users(email, name, phonenum, gender, address) VALUES  ($1, $2, $3, $4, $5)",
      [email, name, phonenum, gender, address]
    );
  } catch (error) {}
};

//Read

export const getUser = async (req, res) => {
  const result = await pool.query("SELECT * FROM users ORDER BY id");
  res.render("index.ejs", { users: result.rows });
};

//Update

export const updateUser = async (req, res) => {
  const { email, name, phonenum, gender, address } = req.body;
  const id = req.parmas.id;
  await pool.query(
    "UPDATE users SET  email = $1, name = $2, phonenum = $3, gender = $4, address = $5, date = NOW() WHERE id = $6",
    [email, name, phonenum, gender, address, id]
  );
};

//Delete

export const deleteUser = async (req, res) => {
  const id = req.parmas.id;
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};
