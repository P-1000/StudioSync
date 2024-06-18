import amqp from "amqplib";
import {sendMail} from "./emailWorker.js"

const sendNotification = async (message) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "notifications";
    await channel.assertQueue(queue, {
      durable: false,
    });

    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(" [x] Sent %s", message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

export { sendNotification };
