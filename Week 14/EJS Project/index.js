import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


const port = 3000;

class Post{
  constructor(title,content){
  this.id = nextId++;
  this.title = title;
  this.content = content;
  }};
  
  let posts=[];
  let nextId=1;

app.get("/", (req, res) => {
  res.render("index.ejs",{posts});
});

app.post("/new", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post(title,content);
  posts.push(post);
  res.render("index.ejs",{posts});
});

app.listen(port, () => {});


