// Defined Routes
import express from "express";
import db from "../models/index"
const Router = express.Router();
const initWebRoutes = (app) => {

    Router.get("/", async (req,res)=> {
       try {
        let data = await db.User.findAll();
        console.log(data)
        return res.send("hello")
       }
       catch (e){
console.log(e);

       }
    })

    return app.use("/", Router);
}
export default initWebRoutes;
