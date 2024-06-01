import express from "express";
import db from "./config/Db.js";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import { inviteRouter } from "./routes/invitationRoutes.js";
import { trackRouter } from "./routes/trackRoutes.js";
import { connect, sendToQueue } from "./config/rabbitMq.js";
import { draftRouter } from "./routes/draftRoute.js";
import { connectToMongoDB } from "./config/Mongo.js";
import { reviewRouter } from "./routes/reviewRoute.js";
import { notificationRouter } from "./routes/notificationRoute.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/tracks", trackRouter);
app.use("/api/auth", authRouter);
app.use("/api/invitations", inviteRouter);
app.use("/api/drafts", draftRouter);
app.use("/api/review", reviewRouter);
app.use("/api/notifications", notificationRouter);

(async () => {
  await connect();
  app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
    console.log("connecting to DB >>>");
    db.connect()
      .then(() => {
        console.log("Connected to DB....");
      })
      .catch((e) => {
        console.log("Error connecting to DB....");
        console.log(e);
      });
    connectToMongoDB();
  });
})();
