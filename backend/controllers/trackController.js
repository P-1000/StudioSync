import db from "../config/Db.js";

// Track Creation
export const createTrack = async (req, res) => {
  const { name, description, deadline } = req.body;
  const creator_id = req.user.id;

  if (!name || !description || !deadline) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const roleCheckQuery = `
      SELECT role FROM users WHERE id = $1
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

// Get all tracks for creator
export const getAllTracks = async (req, res) => {
  const userid = req.user.id;
  try {
    const result = await db.query(
      `SELECT * FROM tracks WHERE creator_id = $1`,
      [userid]
    );
    res.status(200).json({
      track: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Database error: " + error.message });
  }
};

//Get all tracks for a editor :
export const getAllTracksEditor = async (req, res) => {
  const userid = req.user.id;
  try {
    const trackQuery = `
    SELECT track.* , pm.member_id FROM tracks track
    LEFT JOIN project_memberships pm ON track.id = pm.track_id
    WHERE pm.member_id = $1
    `;
    const result = await db.query(trackQuery, [userid]);
    res.status(200).json({
      track: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Database error: " + error.message });
  }
};

// Get track by ID
export const getTrackById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    let trackQuery = `
      SELECT track.*, pm.member_id, u.username as member_username, u.email as member_email
      FROM tracks track
      LEFT JOIN project_memberships pm ON track.id = pm.track_id
      LEFT JOIN users u ON CAST(pm.member_id AS INTEGER) = u.id
      WHERE track.id = $1 
    `;

    if (userRole === "creator") {
      trackQuery += " AND track.creator_id = $2";
    }

    if (userRole === "editor") {
      trackQuery += " AND pm.member_id = $2";
    }

    const trackResult = await db.query(trackQuery, [id, userId]);

    if (trackResult.rows.length === 0) {
      return res.status(404).json({
        message:
          "Track not found or you are not authorized to access this track",
      });
    }

    const track = {
      id: trackResult.rows[0].id,
      name: trackResult.rows[0].name,
      description: trackResult.rows[0].description,
      status: trackResult.rows[0].status,
      created_at: trackResult.rows[0].created_at,
      updated_at: trackResult.rows[0].updated_at,
      deadline: trackResult.rows[0].deadline,
      creator_id: trackResult.rows[0].creator_id,
      memberships: [],
    };

    // Add memberships if any
    trackResult.rows.forEach((row) => {
      if (row.member_id) {
        track.memberships.push({
          member_id: row.member_id,
          member_username: row.member_username,
          member_email: row.member_email,
        });
      }
    });

    return res.status(200).json({ track });
  } catch (error) {
    console.error("Error getting track:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTrackMembers = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
    SELECT track.id, pm.member_id, u.username as member_username, u.email as member_email
    FROM tracks track
    LEFT JOIN project_memberships pm ON track.id = pm.track_id
    LEFT JOIN users u ON CAST(pm.member_id AS INTEGER) = u.id
    WHERE track.id = $1 
    `;
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No members found for the track" });
    }
    const members = result.rows.map((row) => ({
      member_id: row.member_id,
      member_username: row.member_username,
      member_email: row.member_email,
    }));

    res.status(200).json({ members: members });
  } catch (error) {
    res.status(500).json({ error: "Database error: " + error.message });
  }
};
