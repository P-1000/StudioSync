import { Server } from "socket.io";
import http from "http";
import Redis from "ioredis";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "*"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});
const redisClient = new Redis(); //todo : connect to different redis host

io.on("connection", (socket) => {
  socket.on("user-connected", async (userId) => {
    try {
      await redisClient.hset("userSocketMap", userId, socket.id);
      console.log("User connected:", userId ," " ,  socket.id);
    } catch (error) {
      console.error("Error storing userId to socket.id mapping:", error);
    }
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected");
    try {
      const userId = await redisClient.hget("userSocketMap", socket.id);
      if (userId) {
        await redisClient.hdel("userSocketMap", userId);
      }
    } catch (error) {
      console.error("Error removing userId to socket.id mapping:", error);
    }
  });
});

const getSocketIdByUserId = async (userId) => {
  try {
    return await redisClient.hget("userSocketMap", userId);
  } catch (error) {
    console.error("Error getting socket.id by userId from Redis:", error);
    return null;
  }
};

export { io, getSocketIdByUserId };
