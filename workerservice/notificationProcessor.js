import { sendInvitationEmail } from "./invitationService.js";
import { sendRevisionRequestEmail } from "./revisionRequest.js";

async function processNotification(channel, msg) {
  try {
    const notification = JSON.parse(msg.content.toString());

    switch (notification.type) {
      case "invitation":
        await sendInvitationEmail(notification);
        break;
      case "revision_request":
        await sendRevisionRequestEmail(notification);
        break;
      default:
        console.warn("Unknown notification type:", notification.type);
    }

    await channel.ack(msg);
  } catch (error) {
    console.error("Error processing notification:", error);
    await channel.nack(msg, false, true);
  }
}

export { processNotification };
