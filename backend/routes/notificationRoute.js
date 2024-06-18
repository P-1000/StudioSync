import express from "express";
import { verifyToken } from "../middleware/verify.js";
import {
  getNotifications,
  getNotificationCount,
  markNotificationAsRead,
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.get("/", verifyToken, getNotifications);

notificationRouter.get("/count", verifyToken, getNotificationCount);

notificationRouter.patch("/read", verifyToken, markNotificationAsRead);

export { notificationRouter };
