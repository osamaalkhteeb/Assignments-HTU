import express from "express";
import bodyParser from "body-parser";
import axios from "axios"; 

const app = express();
const port = 3000;

const api_url = "http://localhost:4000"; 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");


app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/users`);

    res.render("index.ejs", { users: response.data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


app.get("/new", (req, res) => {
  res.render("modify.ejs", {
    heading: "Create New User",
    submit: "Create User",
    
  });
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${api_url}/users/${id}`);
    res.render("modify.ejs", {
      heading: "Edit User",
      submit: "Edit User",
      user: response.data[0],
    });
  } catch (error) {
    res.status(500).json({ message: "internal servar error", error: error });
  }
});


//Create
app.post("/api/users", async (req, res) => {
  try {
    const response = await axios.post(`${api_url}/users`, {
      email: req.body.email,
      name: req.body.name,
      phonenum: req.body.phonenum,
      gender: req.body.gender,
      address: req.body.address,
    });

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "internal servar error", error: error });
  }
});

app.post("/api/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.patch(`${api_url}/users/${id}`, req.body);

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "internal servar error", error: error });
  }
});

//Delete
app.get("/api/users/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.delete(`${api_url}/users/${id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "internal servar error", error: error });
  }
});

app.listen(port, () => {
  console.log("JS Server is Good");
});



