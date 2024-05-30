import express from "express";
import {
  getuploadurl,
  storeVideoDraft,
} from "../controllers/draftController.js";
import { verifyToken } from "../middleware/verify.js";

export const draftRouter = express.Router();

draftRouter.get("/getuploadurl", getuploadurl);

draftRouter.post("/storevideodraft", verifyToken,  storeVideoDraft);
