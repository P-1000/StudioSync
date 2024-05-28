import amqp from "amqplib";
import { sendMail } from "./emailWorker.js";

async function processInvitation(channel, msg) {
  try {
    const invitation = JSON.parse(msg.content.toString());
    console.log("Processing invitation:", invitation);
    await sendMail();
    await channel.ack(msg);
  } catch (error) {
    console.error("Error processing invitation:", error);
    await channel.nack(msg, false, true);
  }
}
async function startWorker() {
  console.log("Starting worker...");
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("invitations");
    await channel.consume(
      "invitations",
      (msg) => {
        processInvitation(channel, msg);
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
