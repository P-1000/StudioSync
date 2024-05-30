import express from "express";
import {
  createTrack,
  getAllTracks,
  getAllTracksEditor,
  getTrackById,
  getTrackMembers,
} from "../controllers/trackController.js";
import { verifyToken } from "../middleware/verify.js";

const trackRouter = express.Router();

trackRouter.post("/addtrack", verifyToken, createTrack);
trackRouter.get("/getmembers/:id", verifyToken, getTrackMembers);
trackRouter.get("/get", verifyToken, getAllTracks);
trackRouter.get("/geteditortracks", verifyToken, getAllTracksEditor);
trackRouter.get("/gettrack/:id", verifyToken, getTrackById);

export { trackRouter };
