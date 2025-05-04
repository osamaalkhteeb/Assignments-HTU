import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index.ejs')
});
app.post("/submit", (req, res) => {
     const numberOfLetters = req.body["fname"].length + req.body["lname"].length;
     const fullname = req.body["fname"] + " " + req.body["lname"];
 res.render('index.ejs',{numberOfLetters:numberOfLetters,fullname:fullname})
});

app.listen(port, () => {});
