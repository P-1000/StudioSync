import dotenv from 'dotenv';
import readJson from 'r-json';
import Youtube from 'youtube-api';
import bodyParser from 'body-parser';
import path from 'path';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import express from 'express';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const region = process.env.region;
const bucketName = process.env.bucketName;
const access = process.env.access;
const secret = process.env.secret;



export const client = new S3Client({
    region,
    accessKeyId: access,
    secretAccessKey: secret,
    signatureVersion: 'v4',
});



const __dirname = path.dirname(new URL(import.meta.url).pathname);

const filePath = path.join(__dirname, 'client.json');
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

  const s3data = {
    Bucket: process.env.bucketName,
    Key: 'Prime Dunks.mp4'
  };

    const command = new GetObjectCommand(s3data);
    const response = await client.send(command);
    const fileStream = await response.Body.transformToString();

  app.get('/oauth2callback', (req, res) => {
    oauth.getToken(req.query.code, (err, token) => {
      if (err) {
        console.log(err);
      }
      oauth.setCredentials(token);
      console.log(oauth);
      S3Client.GetObjectCommand(s3data, (err, result) => {
        if (!err) {
          const req = Youtube.videos.insert({
            resource: {
              snippet: {
                title: "Upload Test From S3",
                description: "Test Description Bankai Dayo! ",
                tags : ["tag1", "tag2"]
              },
              status: {
                privacyStatus: "public"
              } 
            },
            part: "snippet, status",
            media: {
              mediaType: "video/mov",
              body: fileStream
            }
          }, (err, data) => {
            console.log("Video is uploaded successfully to Youtube!");
            const id = data.data.id;
            const youtube_url =`https://www.youtube.com/watchv=${id}`;
            console.log(youtube_url);
          });
        }
      });
    });
  });


// export const getUploadUrl = async (file) => {
//     const filename = "nodefile";
//     const params = {
//         Bucket: bucketName,
//         Key: filename,
//         Expires: 400,
//     };

//     const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
//     return uploadUrl;
// };





app.get('/', async(req, res) => {
    const uploadUrl = await getUploadUrl()
    res.send({ uploadUrl })
});


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})