import https from "https";
import express, { response } from "express";
import bodyParser from "body-parser";
import { hostname } from "os";



const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{

    const options = { hostname: "https://api.wheretheiss.at/v1/satellites/25544",
        method:"Get",
    };

const request = https.get(options.hostname,(response)=>{
let data = "";
response.on("data",(chunk)=>{
    data+=chunk;
    console.log(data);
});

response.on("end",()=>{

    try{
        const result = JSON.parse(data);
        res.render("index.ejs",result);
    }catch(error){
        console.log("res error")
        res.status(500).send("Failed to fetch data");
    }
});

})


})






app.listen(port,()=>{
    
});