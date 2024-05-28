import express from "express";
import { createTrack , getAllTracks } from "../controllers/trackController.js";
import { verifyToken } from "../middleware/verify.js";

export const trackRouter = express.Router();

trackRouter.post("/addtrack", verifyToken, createTrack);

//todo : update track : 

//todo : delete track :

// get all tracks : 
trackRouter.get("/get" , getAllTracks);
