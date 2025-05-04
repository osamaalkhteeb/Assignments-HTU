import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express();
const port = 3000;

const password = "Hello";
app.use(bodyParser.urlencoded({extended:true}));

//this is the 2nd way

// function passwordCheck(req,res,next){
//     isAuth = false;

//     if(req.body.password === password){
//         isAuth = true;
//     }
//     next();
// }

app.use(passwordCheck)

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/check",(req,res)=>{
    console.log(req.body)
    if(req.body.password === password// (isAuth) this is the 2nd way
    )
        res.sendFile(__dirname + "/public/secret.html")
    else 
    res.sendFile(__dirname + "/public/index.html")
})



app.listen(port, () => {
  console.log("Server");
});
