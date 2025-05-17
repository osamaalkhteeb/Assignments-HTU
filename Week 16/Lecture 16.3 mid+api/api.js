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
    console.log("Connected to PostgreSQL");
  })
  .catch((error) => { status(500).json({ error: error.message });});

//Return users
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

//New user
app.post("/users", async (req, res) => {
  const { email, name, phonenum, gender, address} = req.body;
  try {
    const result = await db.query(
      "INSERT INTO users(email, name, phonenum, gender, address) VALUES  ($1, $2, $3, $4, $5) RETURNING *",
      [email, name, phonenum, gender, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update || Edit

app.patch("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { email, name, phonenum, gender, address } = req.body;

  try {
    const fields = [];
    const values = [];

    let count = 1;
    if (email) {
      fields.push(`email = $${count++}`);
      values.push(email);
    }
    if (name) {
      fields.push(`name = $${count++}`);
      values.push(name);
    }
    if (phonenum) {
      fields.push(`phonenum = $${count++}`);
      values.push(phonenum);
    }
    if (gender) {
        fields.push(`gender = $${count++}`);
        values.push(gender);
      }
    if (address) {
        fields.push(`address = $${count++}`);
        values.push(address);
    }
    values.push(id);
    const result = await db.query(
      `UPDATE users SET  ${fields.join(
        ","
      )}, date = NOW() WHERE id = $${count} RETURNING *`,
      values
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: ` User id ${id} Not Found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { email, name, phonenum, gender, address } = req.body;

  try {
    const result = await db.query(
      "UPDATE users SET  email = $1, name = $2, phonenum = $3, gender = $4, address = $5, date = NOW() WHERE id = $6 RETURNING *",
      [email, name, phonenum, gender, address , id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: ` User id ${id} Not Found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete
app.delete("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: ` User id ${id} Not Found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


app.listen(port, () => {
  console.log("API Server is Good");
});
