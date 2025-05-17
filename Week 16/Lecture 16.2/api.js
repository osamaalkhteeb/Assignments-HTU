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
  .catch(() => {});


//Return posts
app.get("/posts", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query("SELECT * FROM posts WHERE id= $1", [id]);
    if (result.rows.length > 0) res.json(result.rows);
    else res.status(404).json({ error: "Post Not Found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//New post
app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const result = db.query(
      "INSERT INTO posts(title, content, author) VALUES  ($1, $2, $3) RETURNING *",
      [title, content, author]
    );
    res.send(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update || Edit
//patch changing a single or 2 values
app.patch("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;

  try {
    const fields = [];
    const values = [];

    let count = 1;
    if (title) {
      fields.push(`title = $${count++}`);
      values.push(title);
    }
    if (content) {
      fields.push(`content = $${count++}`);
      values.push(content);
    }
    if (author) {
      fields.push(`author = $${count++}`);
      values.push(author);
    }
    values.push(id);
    const result = await db.query(
      `UPDATE posts SET  ${fields.join(
        ","
      )}, date = NOW() WHERE id = $${count} RETURNING *`,
      values
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: ` post id ${id} Not Found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;

  try {
    const result = await db.query(
      "UPDATE posts SET  title = $1, content = $2, author = $3, date = NOW() WHERE id = $4 RETURNING *",
      [title, content, author, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: ` post id ${id} Not Found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete
app.delete("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: ` post id ${id} Not Found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

app.delete("/posts", (req, res) => {
  posts = [];
  res.json(posts);
});

app.listen(port, () => {
  console.log("API Server is Good");
});
