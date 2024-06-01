import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { startWorker } from "./rabbitWorker.js";

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Worker service is active !");
});


(async () => {
  await startWorker().catch(console.error);
  app.listen(port, () => {
    console.log(`Worker service listening at http://localhost:${port}`);
  });
})();
