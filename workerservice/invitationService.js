import {sendMail} from "./emailWorker.js"

export const sendInvitationEmail = async (invitation) => {
    const { editor_email, track_id, invitation_id } = invitation;
    console.log(invitation)
    const subject = "Studio Sync Invitation for Collaboration on Track";
    const text = `
      You have been invited to collaborate on a track with ID: ${track_id}
      Link to accept: http://localhost:3000/accept-invitation/${track_id}/${invitation_id}
    `;
    return await sendMail({ to: editor_email, subject, text });
  };
  