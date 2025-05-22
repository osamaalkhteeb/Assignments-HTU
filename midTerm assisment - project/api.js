import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "blog",
  password: "osama123",
  port: 5432,
});

db.connect()
  .then(() => {
    console.log("connect to postgresSQL");
  })
  .catch((error) => {
  console.error("Error connecting to PostgreSQL:", error.message);
});


app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query("SELECT * FROM users WHERE id= $1", [id]);
    if (result.rows.length > 0) res.json(result.rows);
    else res.status(404).json({ error: "User Not Found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/users", async (req, res) => {
  const { email, name, phonenum, gender, address } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO users (email, name, phonenum, gender, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, name, phonenum, gender, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error details:", error); // سجل الخطأ بالكامل
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log("API Server running correctly");
});
