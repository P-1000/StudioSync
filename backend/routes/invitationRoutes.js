import db from "../config/Db.js";
import express from "express";
import { createInvitation , acceptInvitation , getInvitation } from "../controllers/invitationController.js";

export const inviteRouter = express.Router();

inviteRouter.post("/createnew", createInvitation);

inviteRouter.post("/accept", acceptInvitation );


inviteRouter.get("/get", getInvitation);

//todo : rolecheck middle ware yet to implement :
function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
