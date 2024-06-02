//auth0
import express from "express";
import { login, register } from "../controllers/authController.js";
import { auth } from "express-oauth2-jwt-bearer";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

export default authRouter;
