import express from "express";
import Youtube from "youtube-api";
import readJson from "r-json";
import path from "path";
import cors from "cors";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import aws from "aws-sdk";
import { Sign, sign } from "crypto";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    methods: ["GET", "POST", "PUT", "PATCH"],
  })
);

const region = process.env.region;
const bucketName = process.env.bucketName;
const access = process.env.access;
const secret = process.env.secret;

const s3Client = new S3Client({
  region,
  accessKeyId: access,
  secretAccessKey: secret,
  signatureVersion: "v4",
});

const s3 = new aws.S3({
  region,
  accessKeyId: access,
  secretAccessKey: secret,
  signatureVersion: "v4",
});

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, "client.json");
const credentials = readJson(filePath);

const oauth = Youtube.authenticate({
  type: "oauth",
  client_id: credentials.web.client_id,
  client_secret: credentials.web.client_secret,
  redirect_url: credentials.web.redirect_uris[0],
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/authinit", (req, res) => {
  const authenticationUrl = oauth.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube.upload"],
  });
  res.send({ url: authenticationUrl });
});

app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  const youtubeUrl = await uploadVideo(code);
  res.send({ youtubeUrl });
});

app.get("/getuploadurl", async (req, res) => {
  const params = {
    Bucket: bucketName,
    Key: Math.random().toString(36).substring(7) + ".mp4",
    Expires: 60 * 5,
  };
  const url = await s3.getSignedUrl("putObject", params);
  res.send({ url });
});

const uploadVideo = async (code) => {
  try {
    const token = await oauth.getToken(code);
    oauth.setCredentials(token.tokens);
    const s3Params = {
      Bucket: bucketName,
      Key: "multi-render.mp4",
    };

    const res = await s3Client.send(new GetObjectCommand(s3Params));
    const bodyString = await res.Body;

    const insertParams = {
      resource: {
        snippet: {
          title: "bankai dayo!",
          description: "desc",
        },
        status: {
          privacyStatus: "public",
        },
      },
      part: "snippet, status",
      media: {
        body: bodyString,
        mediaType: "video/mp4",
      },
    };

    const response = await Youtube.videos.insert(insertParams);
    const id = response.data.id;
    const youtubeUrl = `https://www.youtube.com/watchv=${id}`;
    console.log("Video uploaded successfully to YouTube:", youtubeUrl);
    return youtubeUrl;
  } catch (error) {
    console.error("Error uploading video to YouTube:", error);
    return console.log("Error uploading video to YouTube:", error);
  }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
