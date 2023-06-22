require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
// config server;
const app = express();
// test view 
app.get("/", (req,res)=> {
    res.send("hello world")
})

// body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app listen
let port = process.env.PORT || 3000;
app.listen(port, ()=> {
console.log("server is run:",port)
})