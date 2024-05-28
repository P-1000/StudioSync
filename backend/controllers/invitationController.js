import db from "../config/Db.js";

export const createInvitation = async (req, res) => {
  const { track_id, editor_email, creator_id } = req.body;
  // const creator_id = req.user.id;

  try {
    const result = await db.query(
      `INSERT INTO invitations (track_id, creator_id, editor_email, status)
             VALUES ($1, $2, $3, 'pending')
             RETURNING *`,
      [track_id, creator_id, editor_email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error: " + error.message });
  }
};

export const acceptInvitation = async (req, res) => {
  const { invitation_id } = req.body;
  const editor_id = req.user.id;

  try {
    // Update invitation status to accepted
    await db.query(
      `UPDATE invitations SET status = 'accepted', updated_at = CURRENT_TIMESTAMP
             WHERE id = $1 AND editor_email = (SELECT email FROM users WHERE id = $2)`,
      [invitation_id, editor_id]
    );

    // Add editor to the project
    const invitation = await db.query(
      `SELECT track_id FROM invitations WHERE id = $1`,
      [invitation_id]
    );
    await db.query(
      `INSERT INTO project_memberships (track_id, editor_id)
             VALUES ($1, $2)`,
      [invitation.rows[0].track_id, editor_id]
    );

    res.status(200).json({ message: "Invitation accepted" });
  } catch (error) {
    res.status(500).json({ error: "Database error: " + error.message });
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
