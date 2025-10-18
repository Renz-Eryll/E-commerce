import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASSWORD } from "./env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

export default transporter;
