import amqp from "amqplib";
import { processNotification } from "./notificationProcessor.js";

async function startWorker() {
  console.log("Starting worker...");
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("notifications");
    await channel.consume(
      "notifications",
      (msg) => {
        processNotification(channel, msg);
      },
      {
        autoAck: false,
      }
    );
    console.log("Worker started");
  } catch (error) {
    console.error("Error starting worker:", error);
  }
}

export { startWorker };
