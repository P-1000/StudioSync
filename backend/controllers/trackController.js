import db from "../config/Db.js";

// Track Creation
export const createTrack = async (req, res) => {
  const { creator_id } = req.user;
  const { name, description, deadline } = req.body;

  if (!name || !description || !deadline) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const roleCheckQuery = `
      SELECT role FROM users WHERE auth0_user_id = $1
    `;
    const roleCheckResult = await db.query(roleCheckQuery, [creator_id]);

    if (roleCheckResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userRole = roleCheckResult.rows[0].role;

    if (userRole !== "creator") {
      return res
        .status(403)
        .json({ message: "Login with Creator Role to create a track." });
    }

    const insertTrackQuery = `
      INSERT INTO tracks (name, description, creator_id, status, deadline)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const status = "pending";
    const trackResult = await db.query(insertTrackQuery, [
      name,
      description,
      creator_id,
      status,
      deadline,
    ]);

    const newTrack = trackResult.rows[0];
    return res
      .status(201)
      .json({ message: "Track created successfully", track: newTrack });
  } catch (error) {
    console.error("Error creating track:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
