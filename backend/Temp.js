import express from "express";
// import { getUploadUrl } from "./s3.js"
import Youtube from "youtube-api";
import readJson from "r-json";
import path from "path";
import fs from "fs";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const filePath = path.join(__dirname, "client.json");
const CREDENTIALS = readJson(filePath);

const oauth = Youtube.authenticate({
  type: "oauth",
  client_id: CREDENTIALS.web.client_id,
  client_secret: CREDENTIALS.web.client_secret,
  redirect_url: CREDENTIALS.web.redirect_uris[0],
});

const opn_url = oauth.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/youtube.upload"],
});
console.log(opn_url);

app.get("/oauth2callback", (req, res) => {
  oauth.getToken(req.query.code, (err, token) => {
    if (err) {
      console.log(err);
    }
    oauth.setCredentials(token);
    console.log(oauth);

    const req = Youtube.videos.insert(
      {
        resource: {
          snippet: {
            title: "title",
            description: "desc",
          },
          status: {
            privacyStatus: "public",
          },
        },
        part: "snippet, status",
        media: {
          mediaType: "video/mov",
        // here read the file from current folder
            body: fs.createReadStream("./bankai.mp4"),
        },
      },
      (err, data) => {
        console.log("Video is uploaded successfully to Youtube!");
        const id = data.data.id;
        const youtube_url = `https://www.youtube.com/watchv=${id}`;
        console.log(youtube_url);
      }
    );
  });
});

// app.get("/api", async(req, res) => {
//     const uploadUrl = await getUploadUrl()
//     res.send({ uploadUrl })
// })

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
