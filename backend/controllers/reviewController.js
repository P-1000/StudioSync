import Annotation from "../db/AnnotationModel.js";
import db from "../config/Db.js";

export const createAnnotation = async (req, res) => {
  try {
    let { draft_id, track_id, time_seconds, text } = req.body;
    if (!draft_id || !track_id || !time_seconds || !text) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    track_id = parseInt(track_id);
    const annotation = new Annotation({
      draft_id,
      track_id,
      time_seconds,
      text,
    });
    await annotation.save();
    res.status(201).json(annotation);
  } catch (error) {
    console.error("Error creating annotation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the annotation." });
  }
};
