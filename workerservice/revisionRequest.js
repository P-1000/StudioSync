import { sendMail } from "./emailWorker.js";

export const sendRevisionRequestEmail = async (notification) => {
  const { editor_email, track_id, revision_id } = notification;
  const subject = "Studio Sync Revision Request";
  const text = `
      A revision request has been made for the track with ID: ${track_id}.
      Link to view the revision: http://localhost:3000/revision/${track_id}/${revision_id}
    `;
  return await sendMail({ to: editor_email, subject, text });
};
