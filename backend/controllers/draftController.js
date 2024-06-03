import aws from "aws-sdk";
import db from "../config/Db.js";

const region = process.env.region;
const bucketName = process.env.bucketName;
const access = process.env.access;
const secret = process.env.secret;

const s3 = new aws.S3({
  region,
  accessKeyId: access,
  secretAccessKey: secret,
  signatureVersion: "v4",
});

export const getuploadurl = async (req, res) => {
  try {
    if (!region || !bucketName || !access || !secret) {
      return res
        .status(500)
        .json({ error: "AWS configuration is incomplete." });
    }

    const filename = Math.random().toString(36).substring(7) + ".mp4";
    const params = {
      Bucket: bucketName,
      Key: filename,
      Expires: 60 * 5,
    };
    const url = await s3.getSignedUrl("putObject", params);
    if (!url) {
      return res.status(500).json({ error: "Failed to generate upload URL." });
    }
    res.send({ url, filename });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const storeVideoDraft = async (req, res) => {
  try {
    const { track_id, video_url, title, description, status } = req.body;
    const editor_id = req.user.id;
    if (!track_id || !video_url || !title || !description || !status) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const query = `
          INSERT INTO video_drafts (track_id, editor_id, video_url, title, description, status)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
        `;
    const values = [track_id, editor_id, video_url, title, description, status];
    const result = await db.query(query, values);

    res.status(201).json({
      message: "Video draft stored successfully.",
      draft: result.rows[0],
    });
  } catch (error) {
    console.error("Error storing video draft:", error);
    res.status(500).json({ error: "Failed to store video draft." });
  }
};

export const storeMetaDataDraft = async (req, res) => {
  try {
    const {
      track_id,
      editor_id,
      title,
      description,
      tags,
      thumbnail_url,
      status,
    } = req.body;

    const query = `
          INSERT INTO metadata_drafts (track_id, editor_id, title, description, tags, thumbnail_url, status)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *
        `;
    const values = [
      track_id,
      editor_id,
      title,
      description,
      tags,
      thumbnail_url,
      status,
    ];
    const result = await db.query(query, values);

    res.status(201).json({
      message: "Metadata draft stored successfully.",
      draft: result.rows[0],
    });
  } catch (error) {
    console.error("Error storing metadata draft:", error);
    res.status(500).json({ error: "Failed to store metadata draft." });
  }
};

export const getVideoDrafts = async (req, res) => {
  const { track_id } = req.params;
  try {
    const query = `
      SELECT video_drafts.*, users.username as editor_username 
      FROM video_drafts
      JOIN users ON video_drafts.editor_id = users.id
      WHERE video_drafts.track_id = $1
        `;

    const result = await db.query(query, [track_id]);

    res.status(200).json({ videodrafts: result.rows });
  } catch (error) {
    console.error("Error fetching drafts:", error);
    res.status(500).json({ error: "Failed to fetch drafts." });
  }
};

app.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.redirect(
    `http://localhost:3000/oauth2callback?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`
  );
});

export const uploadVideoToYoutube = async (req, res) => {
  const { s3Key, accessToken, refreshToken } = req.body;
};
