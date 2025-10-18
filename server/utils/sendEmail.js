import transporter from "../config/nodemailer.js";
import { EMAIL_FROM } from "../config/env.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: EMAIL_FROM,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
