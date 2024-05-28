import db from "../config/Db.js";

export const createDraft = async (req, res) => {
  const { track_id } = req.params;
  const {
    video_url,
    type,
    title,
    description,
    tags,
    thumbnail_url,
  } = req.body;

  const editor_id = req.user.sub;

  if (
    !editor_id ||
    !type ||
    (type === "video" && !video_url) ||
    (type === "metadata" && (!title || !description))
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await db.query("BEGIN");

    const insertDraftQuery = `
      INSERT INTO drafts (track_id, editor_id, video_url, type, status)
      VALUES ($1, $2, $3, $4, 'pending')
      RETURNING *
    `;
    const draftResult = await db.query(insertDraftQuery, [
      track_id,
      editor_id,
      video_url || null,
      type,
    ]);

    const newDraft = draftResult.rows[0];

    if (type === "metadata") {
      const insertMetadataQuery = `
        INSERT INTO metadata (draft_id, title, description, tags, thumbnail_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      await db.query(insertMetadataQuery, [
        newDraft.id,
        title,
        description,
        tags,
        thumbnail_url,
      ]);
    }

    await db.query("COMMIT");
    return res
      .status(201)
      .json({ message: "Draft created successfully", draft: newDraft });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error creating draft:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDrafts = async (req, res) => {
  const { track_id } = req.params;

  try {
    const draftsQuery = `SELECT * FROM drafts WHERE track_id = $1`;
    const draftsResult = await db.query(draftsQuery, [track_id]);

    return res.status(200).json(draftsResult.rows);
  } catch (error) {
    console.error("Error fetching drafts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateDraft = async (req, res) => {
  //todo : role check , protect this route 
  const { track_id, draft_id } = req.params;
  const { status } = req.body;

  if (!status || !["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updateDraftQuery = `
      UPDATE drafts
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND track_id = $3
      RETURNING *
    `;
    const draftResult = await db.query(updateDraftQuery, [
      status,
      draft_id,
      track_id,
    ]);

    if (draftResult.rows.length === 0) {
      return res.status(404).json({ message: "Draft not found" });
    }

    const updatedDraft = draftResult.rows[0];
    return res
      .status(200)
      .json({ message: "Draft updated successfully", draft: updatedDraft });
  } catch (error) {
    console.error("Error updating draft:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
