import nodemailer from "nodemailer";

export const sendMail = async () => {
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
      to: "earn.vpn@gmail.com",
      subject: "Studio Sync Test Email",
      text: "This is a test email from Studio Sync.",
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
