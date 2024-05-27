import express from "express";
import { createTrack } from "../controllers/trackController.js";

export const trackRouter = express.Router();

// trackRouter.get("/gettrack", )

trackRouter.post("/addtrack", createTrack);
