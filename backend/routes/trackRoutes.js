import express from "express";
import {
  createTrack,
  getAllTracks,
  getTrackById,
} from "../controllers/trackController.js";
import { verifyToken } from "../middleware/verify.js";

export const trackRouter = express.Router();

trackRouter.post("/addtrack", verifyToken, createTrack);

//todo : update track :

//todo : delete track :

// get all tracks :
trackRouter.get("/get", verifyToken, getAllTracks);

// get track by id :
trackRouter.get("/gettrack/:id", verifyToken, getTrackById);
