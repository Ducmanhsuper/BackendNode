// Defined Routes
import express from "express";
import bodyParser from "body-parser";
import controllers from "../controllers/controllers"
const router = express.Router();
const webRoutes = (app) => {
    router.get("/webhook", controllers.getWebhook);
    router.post("/webhook",bodyParser.json(), controllers.postWebhook);
    router.get("/", controllers.getHomepage);
    return app.use("/", router)
 }

 module.exports = webRoutes;