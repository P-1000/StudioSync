import express from "express";
import { getuploadurl } from "../controllers/draftController.js";

export const draftRouter = express.Router();

draftRouter.get("/getuploadurl" , getuploadurl);
