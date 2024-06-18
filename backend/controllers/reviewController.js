import Annotation from "../db/AnnotationModel.js";
import db from "../config/Db.js";
import { sendToQueue } from "../config/rabbitMq.js";

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

export const sendVideoAnnotationToEditor = async (req, res) => {
  const { draft_id, track_id } = req.body;
  const { id } = req.user;
  try {
    const draft = await db.query(`SELECT * FROM video_drafts WHERE id = $1`, [
      draft_id,
    ]);
    if (draft.rows.length === 0) {
      return res.status(403).json({ error: "Forbidden" }); //todo bankai check
    }
    const track = await db.query(`SELECT * FROM tracks WHERE id = $1`, [
      draft.rows[0].track_id,
    ]);
    if (track.rows.length === 0) {
      return res.status(404).json({ error: "Track not found" });
    }
    const getEditorEmailQuery = `
      SELECT email from users WHERE id = $1
    `;
    const editorEmail = await db.query(getEditorEmailQuery, [
      draft.rows[0].editor_id,
    ]);
    const notificationMessage = `Your video draft for track ${track.rows[0].name} requires revision.`;

    const query = `
    UPDATE video_drafts
    SET status = 'revision-requested'
    WHERE id = $1
    RETURNING *
    `;
    const result = await db.query(query, [draft_id]);
    const insertNot = await db.query(
      `INSERT INTO notifications (user_id, type, message, is_read)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [draft.rows[0].editor_id, "revision_request", notificationMessage, false]
    );
    const message = {
      track_id,
      id: insertNot.rows[0].id,
      track_name: track.rows[0].name,
      editor_email: editorEmail.rows[0].email,
      editor_id: draft.rows[0].editor_id,
      draft_id,
      type: "revision_request",
      created_at : insertNot.rows[0].created_at,
       notificationMessage,
    };
    sendToQueue("notifications", JSON.stringify(message));
    res.status(200).json({ message: "Annotation sent to editor." });
  } catch (error) {
    console.log("Error sending video annotation to editor:", error);
  }
};
