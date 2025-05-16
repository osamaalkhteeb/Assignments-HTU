import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industray.",
    author: "Alex Thompson",
    date: "2025-08-01T10:00.00Z",
  },
  {
    id: 2,
    title: "Artificial Intelligence",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present.",
    author: "Mia Williams",
    date: "2025-08-5T14:30.00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainablilty is more than just a buzzword; it's a way of life.",
    author: "Samuel Green",
    date: "2025-08-10T09:15.00Z",
  },
];

let lastId = 3;

//Return posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (post) res.json(post);
  res.status(404).json({ error: "Post Not Found" });
});

//New post
app.post("/posts", (req, res) => {
  lastId++;
  const newPost = {
    id: lastId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };

  posts.push(newPost);
  res.status(201).json(newPost); // just for testing bc its a create
});

//Update || Edit
app.patch("/posts/:id", (req, res) => {
  // We mostly use patch instead of put bc the user may edit 1 or more value
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex > -1) {
    const postObj = posts[postIndex];
    const updatedPost = {
      id: id,
      title: req.body.title || postObj.title,
      content: req.body.content || postObj.content,
      author: req.body.author || postObj.author,
      date: postObj.date,
    };

    posts[postIndex] = updatedPost;
    res.status(200).json(updatedPost);
  } else {
    res.status(404).json({ error: ` post id ${id} Not Found` });
  }
});

app.put("/posts/:id", (req, res) => {
  // Put is used to edit all the values
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex > -1) {
    const postObj = posts[postIndex];
    const updatedPost = {
      id: id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: new Date(),
    };

    posts[postIndex] = updatedPost;
    res.status(200).json(updatedPost);
  } else {
    res.status(404).json({ error: ` post id ${id} Not Found` });
  }
});

//Delete
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex > -1) {
    posts.splice(postIndex, 1);
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: ` post id ${id} Not Found` });
  }
});

app.delete("/posts", (req, res) => {
  posts = [];
  res.json(posts);
});

app.listen(port, () => {
  console.log("API Server is Good");
});
