import db from "../config/Db.js";
import express from "express";
import checkRole from "../middleware/roleCheck.js";
import {
  createInvitation,
  acceptInvitation,
  getInvitation,
  findEmail,
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

inviteRouter.get("/get", verifyToken, getInvitation); 

inviteRouter.get("/findemail", findEmail); //todo:for creators only
