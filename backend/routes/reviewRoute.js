import express from "express";
import { createAnnotation } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/postannotation", createAnnotation);

export { reviewRouter };
