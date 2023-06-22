// Defined Routes
import express from "express";
import controllers from "../controllers/controllers"
const router = express.Router();
const webRoutes = (app) => {
    router.get("/webhook", controllers.getWebhook);
    router.post("/webhook", controllers.postWebhook);
    return app.use("/", router)
 }

 module.exports = webRoutes;