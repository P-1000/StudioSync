import express from "express";
import { createTrack , getAllTracks } from "../controllers/trackController.js";

export const trackRouter = express.Router();

trackRouter.post("/addtrack", createTrack);

//todo : update track : 

//todo : delete track :

// get all tracks : 
trackRouter.get("/get" , getAllTracks);
