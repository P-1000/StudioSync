import nodemailer from "nodemailer";
import { io } from "./socket.js";

export const sendMail = async ({ to, subject, text }) => {
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
      to: to,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);

    io.emit("notification", {
      to: to,
      message: `New email sent: ${subject}`, 
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
