import express from "express";
import db from "./config/Db.js";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import { inviteRouter } from "./routes/invitationRoutes.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", authRouter);
app.use("/api/invitations", inviteRouter);

app.listen(port, () => {
  console.log("connecting to DB >>>");
  db.connect()
    .then(() => {
      console.log("Connected to DB....");
    })
    .catch((e) => {
      console.log("Error connecting to DB....");
      console.log(e);
    });
  console.log(` app listening at port ${port}`);
});
