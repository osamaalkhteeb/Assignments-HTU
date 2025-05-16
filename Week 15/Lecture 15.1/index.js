import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let colors = [
  { name: "red", id: 1, value: "f00" },
  { name: "green", id: 2, value: "#0f0" },
  { name: "blue", id: 3, value: "#00f" },
  { name: "cyan", id: 4, value: "#0ff" },
  { name: "magenta", id: 5, value: "#f0f" },
  { name: "yellow", id: 6, value: "#ff9" },
  { name: "black", id: 7, value: "#000" },
];

let lastId = 7;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/colors", (req, res) => {
  res.json(colors);
});

app.get("/random", (req, res) => {
  const randomColor = Math.floor(Math.random() * colors.length);
  res.json(colors);
});

app.get("/colors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const colorObj = colors.find((color) => color.id === id);
});

app.get("/filter", (req, res) => {
  const colorQ = req.query.color;
  const listOffFilteredColors = colors.filter(
    (color) => color.color === colorQ
  );
  res.json(listOffFilteredColors);
});

app.post("/colors", (req, res) => {
  lastId++;
  const newColor = {
    id: lastId,
    color: req.body.color,
    value: req.body.value,
  };
  colors.push(newColor);
  res.status(200).json(newColor);
});

app.put("/colors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedColor = {
    id: id,
    color: req.body.color,
    value: req.body.value,
  };

  const colorIndex = colors.find((color) => color.id === id);

  colors[colorIndex] = updatedColor;
  res.json(updatedColor);
});

app.patch("/colors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const colorObj = colors.find((color) => color.id === id);

  const updatedColor = {
    id: id,
    color: req.body.color || colorObj.color,
    value: req.body.value || colorObj.value,
  };

  const colorIndex = colors.find((color) => color.id === id);

  colors[colorIndex] = updatedColor;
  res.json(updatedColor);
});

app.delete("/colors/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const colorIndex = colors.findIndex((color) => color.id === id);

  if (colorIndex > -1) {
    colors.splice(colorIndex, 1);
    res.sendStatus(200);
  }else{
    res.status(404).json({ error: `Color ${id} not found` });
  }
});

app.delete("/all", (req, res) => {
  colors = [];
  res.sendStatus(200);
  
});
app.listen(port, () => {});
