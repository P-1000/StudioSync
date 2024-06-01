import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http"; // Import createServer from http module
import { startWorker } from "./rabbitWorker.js";
import redis from "redis";
import { io } from "./socket.js";

dotenv.config();

const app = express();
const port = 3001;

const server = createServer(app);

const redisClient = redis.createClient();

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

await redisClient.connect();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Worker service is active !");
});

io.attach(server);


(async () => {
  await startWorker().catch(console.error);
  server.listen(port, () => {
    console.log(`Worker service listening at http://localhost:${port}`);
  });
})();
