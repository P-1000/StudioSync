//auth0
import express from "express";
import { checkInDb } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/checkdb", checkInDb);

export default authRouter;
