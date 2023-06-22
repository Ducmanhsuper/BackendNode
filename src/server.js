import express from "express";
import ConfigBodyParser from "./Setting/configBodyParser";
import ListenApp from "./Setting/ListenApp";
import webRoutes from "./routes/Web";
// config server;
const app = express();
// Routing
webRoutes(app);
// body-parser 
ConfigBodyParser(app);
// app listen
ListenApp(app);