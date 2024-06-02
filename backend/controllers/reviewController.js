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

export const getAnnotations = async (req, res) => {
  try {
    const { draft_id } = req.params;
    if (!draft_id) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    let annotations = await Annotation.find({ draft_id });
    let sortedAnnotations = annotations.sort(
      (a, b) => a.time_seconds - b.time_seconds
    );
    sortedAnnotations = sortedAnnotations.map((annotation) => {
      const { draft_id, track_id, ...rest } = annotation.toObject();
      return rest;
    });
    res.status(200).json(sortedAnnotations);
  } catch (error) {
    console.error("Error getting annotations:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the annotations." });
  }
};
