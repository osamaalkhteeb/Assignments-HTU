import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const today = new Date();
  const day = today.getDay();
  let type = "a weekday";
  let adv = "i's time to work";
  const data = {
    title: "EJS Tags",
    seconds: new Date().getSeconds(),
    items: ["apple", "banana", "cherry"],
    htmlContent: "<strong>This is some strong text</strong>",
    type,
    adv,
    day,
  };

  if(day === 5 || day === 6){
    type = "the weekend";
    adv ="It's time to have fun";
  }

  res.render("index.ejs",data);
});

app.listen(port, () => {});
