import aws from "aws-sdk";

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
