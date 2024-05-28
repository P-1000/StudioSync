import db from "../config/Db.js";
import express from "express";
import {
  createInvitation,
  acceptInvitation,
  getInvitation,
} from "../controllers/invitationController.js";
import { verifyToken } from "../middleware/verify.js";

export const inviteRouter = express.Router();

inviteRouter.post(
  "/createnew",
  verifyToken,
  checkRole("creator"),
  createInvitation
);

inviteRouter.post("/accept", verifyToken, acceptInvitation);

inviteRouter.get("/get", verifyToken, checkRole("editor"), getInvitation);
