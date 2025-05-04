import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));



app.get("/",(req,res)=>{
res.sendFile(__dirname + '/public/index.html')
});

app.post("/submit",(req,res)=>{
    const name = req.body.name;
    res.render('index.ejs',{
        name:name,
        cart:["item 1","item 2","item 3"],
        content:"Niggers",
    });
    });


app.listen(port,()=>{});