import pool from "../config/db.js";

//Read

export const getPost = async (req, res) => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id");
  res.render("index.ejs", {posts: result.rows });
};

//Read by id 

export const getPostId = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const result = await pool.query("SELECT * FROM posts WHERE id= $1", [id]);
        if (result.rows.length > 0) res.json(result.rows);
        else res.status(404).json({ error: "Post Not Found" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }}

//Create

export const createPost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO posts(title, content, author) VALUES  ($1, $2, $3) RETURNING *",
      [title, content, author]
    );
    res.status(201).json(result.rows[0]);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNew = async (req, res) => {
  res.render("modify", {
        heading: "Create New Post",
        post: null,
        submit: "Create"
      });
  };

  export const getEdit = (req, res) => {
    res.render("modify", {
      heading: "Edit Post",
      post: null,
      submit: "edit"
    });}

//Update all

export const updatePost = async (req, res) => {
    const id = parseInt(req.params.id);
  const { title, content, author } = req.body;
  try {
    const result = await pool.query(
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
  };

  //Update 1 Value or more 

  export const updatePostPatch = async(req,res)=>{
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
      const result = await pool.query(
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
  };

  //Delete

export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM posts WHERE id = $1 ", [id]);
    if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ error: ` post id ${id} Not Found` });
      }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};






  
