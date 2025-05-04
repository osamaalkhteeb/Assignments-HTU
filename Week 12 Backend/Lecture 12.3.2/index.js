import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
const port = 3000;
let userInfo={
    email:null,
    password:null,
}

app.use(bodyParser.urlencoded({extended:true}));


function saveToDb(req,res,next){
    (userInfo.email = req.body.email),(userInfo.password = req.body.password);
    next();
}
app.use(saveToDb)


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/submit",(req,res)=>{
    console.log(req.body)
    res.send(`<h1>Your email ${req.body.email} and password ${req.body.password}</h1>`)
})


// app.get("/", (req, res) => {
//   res.send("<h1>Hello</h1>");
// });

// app.post("/about", (req, res) => {
//     console.log(req.body)
    
//   });

//   app.post("/contact", (req, res) => {
//     res.sendStatus(201);
//   });

//   app.put("/login", (req, res) => {
//     res.send('<form><label for="email">Email:</label><br/><input type="email" id="email" required/><br/><br/><label for="password">Password:</label><br /><input type="password" id="password" required/><br/><br/><button type="submit">Login</button></form>');
//     res.sendStatus(204);
// });
// app.patch("/test", (req, res) => {
//     res.sendStatus(203);
//   });

app.listen(port, () => {
  console.log("Server");
});
