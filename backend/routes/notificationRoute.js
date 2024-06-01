import express from "express";
import { verifyToken } from "../middleware/verify.js";
import { getNotifications } from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.get("/",verifyToken ,getNotifications);


export  {notificationRouter};