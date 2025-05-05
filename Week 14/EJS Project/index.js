import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


const port = 3000;

class Post{
  constructor(title,content){
  this.id = (nextId++).toString();
  this.title = title;
  this.content = content;
  }};
  
  let posts=[];
  let nextId=1;

app.get("/", (req, res) => {
  res.render("index.ejs",{posts});
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/new", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post(title,content);
  posts.push(post);
  res.redirect("/");
});

app.get("/edit/:id",(req,res)=>{
  const post = posts.find((p) => p.id === req.params.id);
  if(!post) return res.redirect("/");
  res.render("edit.ejs",{post});
})

app.post("/edit/:id",(req,res) =>{
  const title = req.body.title;
  const content = req.body.content;
  posts = posts.map((p) => (p.id === req.params.id ? { ...p, title, content } : p));
  res.redirect("/");
})
app.post("/delete/:id",(req,res)=>{
  posts = posts.filter((p)=> p.id !== req.params.id)
  res.redirect("/");
})
app.listen(port, () => {});


