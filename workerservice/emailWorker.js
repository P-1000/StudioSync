import nodemailer from "nodemailer";

export const sendMail = async (invitation) => {
  const { editor_email, track_id, invitation_id } = invitation;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_HOST,
      to: editor_email,
      subject: "Studio Sync Test Email",
      text: `
      You have been invited to collaborate on a track with ID: ${track_id}
      link to accept: http://localhost:3000/accept-invitation/${track_id}/${invitation_id}     
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
