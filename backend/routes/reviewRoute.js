import express from "express";
import {
  createAnnotation,
  getAnnotations,
  sendVideoAnnotationToEditor,
} from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/verify.js";

const reviewRouter = express.Router();

reviewRouter.post("/postannotation", createAnnotation);

reviewRouter.get("/getannotations/:draft_id", getAnnotations);

reviewRouter.post("/sendvideoannotation",verifyToken, sendVideoAnnotationToEditor);
export { reviewRouter };
