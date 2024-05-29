import amqp from "amqplib";

let channel;

async function connect() {
  console.log("Connecting to RabbitMQ");
  try {
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
    await channel.assertQueue("invitations", { durable: true });
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
  }
}

async function sendToQueue(queue, message) {
  if (!channel) {
    console.error("RabbitMQ channel is not initialized");
    return;
  }
  try {
    await channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true,
    });
    console.log(`Message sent to queue ${queue}`);
  } catch (error) {
    console.error("Failed to send message to RabbitMQ:", error);
  }
}

export { connect, sendToQueue };
