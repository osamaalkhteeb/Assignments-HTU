import express from "express";

const app = express();

app.use(express.static("public"));

const port = 3000;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    const randomName1=adj[Math.floor(Math.random() * adj.length)];
    const randomName2=noun[Math.floor(Math.random() * noun.length)]
res.render('index.ejs',{
    randomName1:randomName1,
    randomName2,randomName2,
})
  });
  
app.listen(port, () => {});


const adj = [
    "wiggly",
    "wild",
    "willing",
    "wilted",
    "winding",
    "windy",
    "wiry",
    "wise",
    "witty",
    "wobbly",
]
const noun = [
    "yiggly",
    "yild",
    "yilling",
    "yilted",
    "yinding",
    "yindy",
    "yiry",
    "yise",
    "yitty",
    "yobbly",
]