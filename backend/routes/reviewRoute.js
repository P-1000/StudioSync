import express from "express";
import {
  createAnnotation,
  getAnnotations,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/postannotation", createAnnotation);

reviewRouter.get("/getannotations/:draft_id", getAnnotations);
export { reviewRouter };
