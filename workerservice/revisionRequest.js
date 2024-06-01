import { sendMail } from "./emailWorker.js";
import { io } from "./socket.js";
import Redis from "ioredis";

const redisClient = new Redis(); //todo : connect to different redis host

export const sendRevisionRequestEmail = async (notification) => {
  const { editor_email, track_id, revision_id, editor_id } = notification;
  console.log(editor_id)
  const subject = "Studio Sync Revision Request";
  const text = `
      A revision request has been made for the track with ID: ${track_id}.
      Link to view the revision: http://localhost:3000/revision/${track_id}/${revision_id}
    `;
  const editorSocketId = await redisClient.hget("userSocketMap", editor_id);
  if (editorSocketId) {
    io.to(editorSocketId).emit("new-notification", {
      track_id,
      message: `A revision request has been made for the track with ID: ${track_id}`,
    });
  }
  // return await sendMail({ to: editor_email, subject, text });
};
