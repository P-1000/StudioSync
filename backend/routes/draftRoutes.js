import express from "express";
import {
  createDraft,
  getDrafts,
  updateDraft,
} from "../controllers/draftsController";

const draftRouter = express.Router();

draftRouter.post("/:track_id", createDraft);

draftRouter.get("/:track_id", getDrafts);

draftRouter.put("/:track_id/drafts/:draft_id", updateDraft);

export default draftRouter;
