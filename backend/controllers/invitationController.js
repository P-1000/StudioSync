import db from "../config/Db.js";
import { sendToQueue } from "../config/rabbitMq.js";

export const createInvitation = async (req, res) => {
  const { track_id, editor_email, creator_id, editor_id } = req.body;
  // const creator_id = req.user.id;
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
    SELECT * FROM project_memberships WHERE auth0_user_id = $1`,
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
    const message = {
      track_id,
      editor_email,
      creator_id,
      editor_id,
      invitation_id: result.rows[0].id,
    };
    sendToQueue("invitations", JSON.stringify(message));
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error: " + error.message });
  }
};

export const acceptInvitation = async (req, res) => {
  const { invitation_id } = req.body;
  const editor_id = req.user.id;

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `UPDATE invitations SET status = 'accepted', updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND editor_email = (SELECT email FROM users WHERE id = $2)`,
      [invitation_id, editor_id]
    );

    const invitation = await client.query(
      `SELECT track_id FROM invitations WHERE id = $1`,
      [invitation_id]
    );

    if (invitation.rows.length === 0) {
      throw new Error("Invitation not found");
    }

    const track_id = invitation.rows[0].track_id;

    await client.query(
      `INSERT INTO project_memberships (track_id, editor_id)
       VALUES ($1, $2)`,
      [track_id, editor_id]
    );
    await client.query("COMMIT");

    res.status(200).json({ message: "Invitation accepted" });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: "Database error: " + error.message });
  } finally {
    client.release();
  }
};

export const getInvitation = async (req, res) => {
  const user_id = req.user.id;

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

//todo : rolecheck middle ware yet to implement :
function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
