import { CLIENT_URL } from "../config/env.js";

export const verificationEmailTemplate = (name, verificationToken) => {
  const verificationLink = `${CLIENT_URL}/verify-email?token=${verificationToken}`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #000; color: #fff; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 5px; margin: 20px 0; }
        .button { display: inline-block; background: #EE2E24; color: #fff; padding: 12px 30px; 
                  text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛹 Ecommerce Shoe Store</h1>
        </div>
        <div class="content">
          <h2>Welcome, ${name}! 👋</h2>
          <p>Thank you for signing up for Ecommerce Shoe Store. We're excited to have you on board!</p>
          <p>To complete your registration, please verify your email address by clicking the button below:</p>
          <div style="text-align: center;">
            <a href="${verificationLink}" class="button">Verify Email Address</a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationLink}</p>
          <p><strong>This link will expire in 24 hours.</strong></p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>© 2025 E-commerce Shoe Store. All rights reserved.</p>
          <p>This is an automated email, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const welcomeEmailTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #000; color: #fff; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 5px; margin: 20px 0; }
        .button { display: inline-block; background: #EE2E24; color: #fff; padding: 12px 30px; 
                  text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛹 Ecommerce Shoe Store</h1>
        </div>
        <div class="content">
          <h2>🎉 Email Verified Successfully!</h2>
          <p>Hi ${name},</p>
          <p>Your email has been verified successfully. You can now log in and start shopping!</p>
          <div style="text-align: center;">
            <a href="${CLIENT_URL}/login" class="button">Go to Login</a>
          </div>
          <p>Happy shopping! 🛍️</p>
        </div>
        <div class="footer">
          <p>© 2025 Ecommerce Shoe Store. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
