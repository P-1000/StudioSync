import db from "../config/Db.js";
import { sendToQueue } from "../config/rabbitMq.js";

export const createInvitation = async (req, res) => {
  const { track_id, editor_email, editor_id } = req.body;
  const creator_id = req.user.id;
  try {
    const track = await db.query(
      `SELECT * FROM tracks WHERE id = $1 AND creator_id = $2`,
      [track_id, creator_id]
    );

    if (track.rows.length === 0) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const editorEmail = await db.query(
      `SELECT email FROM users WHERE email = $1`,
      [editor_email]
    );

    if (editorEmail.rows.length === 0) {
      return res.status(404).json({ error: "Editor not found" });
    }

    const isAlreadyMember = await db.query(
      `
    SELECT * FROM project_memberships WHERE member_id = $1`,
      [editor_id]
    );

    if (isAlreadyMember.rows.length > 0) {
      return res.status(403).json({ error: "Editor is already a member" });
    }

    const result = await db.query(
      `INSERT INTO invitations (track_id, creator_id, editor_email, status)
             VALUES ($1, $2, $3, 'pending')
             RETURNING *`,
      [track_id, creator_id, editor_email]
    );
    const notificationMessage = `You have a new invitation for track ${track.name}.`;
    const message = {
      track_id,
      editor_email,
      invitation_id: result.rows[0].id,
      creator_id,
      status: "pending",
      type: "invitation",
      editor_id,
    };

    await db.query(
      `INSERT INTO notifications (user_id, type, message, is_read)
        VALUES ($1, $2, $3, $4)`,
      [editor_id, "invitation", notificationMessage, false]
    );
    sendToQueue("notifications", JSON.stringify(message));
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error: " + error.message });
  }
};

export const acceptInvitation = async (req, res) => {
  const { invitation_id } = req.body;
  const editor_id = req.user.id;

  try {
    const client = await db.connect();

    const invitationQuery = await client.query(
      `SELECT track_id, editor_email 
       FROM invitations 
       WHERE id = $1 AND status = 'pending'`,
      [invitation_id]
    );

    if (invitationQuery.rows.length === 0) {
      await client.release();
      return res
        .status(404)
        .json({ error: "Invitation not found or already processed" });
    }

    const { track_id, editor_email } = invitationQuery.rows[0];

    await client.query("BEGIN");

    await client.query(
      `UPDATE invitations 
       SET status = 'accepted', updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1`,
      [invitation_id]
    );

    await client.query(
      `INSERT INTO project_memberships (track_id, member_id)
       VALUES ($1, $2)`,
      [track_id, editor_id]
    );

    await client.query("COMMIT");

    await client.release();

    return res.status(200).json({ message: "Invitation accepted" });
  } catch (error) {
    console.error("Error accepting invitation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getInvitation = async (req, res) => {
  const user_id = req.user.email;

  try {
    const result = await db.query(
      `SELECT * FROM invitations WHERE editor_email = (SELECT email FROM users WHERE id = $1)`,
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Database error: " + error.message });
  }
};

export const findEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  try {
    const emailfindquery = `
    SELECT * FROM users WHERE email = $1 AND role = 'editor'
    `;
    const result = await db.query(emailfindquery, [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Email not found" });
    }
    const editor = result.rows[0];
    res.status(200).json(editor);
  } catch (er) {
    console.log(er);
  }
};
