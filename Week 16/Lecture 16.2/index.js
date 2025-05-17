import express from "express";
import bodyParser from "body-parser";
import axios from "axios"; //axios is for calling apis

const app = express();
const port = 3000;

const api_url = "http://localhost:4000"; //This is the end point
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/posts`);

    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


app.get("/new", (req, res) => {
  res.render("modify.ejs", {
    heading: "Create New Post",
    submit: "Create Post",
  });
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${api_url}/posts/${id}`);
    res.render("modify.ejs", {
      heading: "Edit post",
      submit: "Edit post",
      post: response.data[0],
    });
  } catch (error) {
    res.status(500).json({ message: "internal servar error", error: error });
  }
});

// When usin methods in js they need to be the same methods in the api " like post here = post in api"

//Create
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${api_url}/posts`, {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "internal servar error", error: error });
  }
});

//edit => use post method bc the forms only has posts and gets
app.post("/api/posts/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.patch(`${api_url}/posts/${id}`, req.body);

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "internal servar error", error: error });
  }
});

//Delete
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.delete(`${api_url}/posts/${id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "internal servar error", error: error });
  }
});

app.listen(port, () => {
  console.log("JS Server is Good");
});
