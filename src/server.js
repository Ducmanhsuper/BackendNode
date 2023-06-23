require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./routes/Router";
import configViewEngine from "./config/viewEngine";
import Testdb from "./Databases/testdb";
// config server;
const app = express();
// configViewengine
configViewEngine(app);
// Routes 
initWebRoutes(app);
// body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// testDb
Testdb()
// app listen
let port = process.env.PORT || 3000;
app.listen(port, ()=> {
console.log("server is run:",port)
})