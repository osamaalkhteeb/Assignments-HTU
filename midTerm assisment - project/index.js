import express from "express";
import bodyParser from "body-parser";
// import methodOverride from "method-override";
import axios from "axios";

const app = express();
const port = 3000;

const api_url = "http://localhost:4000"; //end point => after 4000 it is change
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/users`);

    res.render("index.ejs", { users: response.data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// app.get("/new", (req, res) => {
//   res.render("modify.ejs", {
//     heading: "Create New User",
//     submit: "Create User",
//   });
// });

app.post("/api/users", async (req, res) => {

  try {
    const response = await axios.post(`${api_url}/users`, req.body);
    res.redirect("/");
  } catch (error) {
  res.status(500).json({message: "internal server error", error: error})
  }
});



app.listen(port, () => {
  console.log("server");
});
