import express from "express";
import { verifyToken } from "../middleware/verify.js";
import { getNotifications , getNotificationCount} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.get("/",verifyToken ,getNotifications);

notificationRouter.get("/count" , verifyToken , getNotificationCount)

export  {notificationRouter};