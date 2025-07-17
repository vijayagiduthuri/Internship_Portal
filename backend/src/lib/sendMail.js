import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendRegistrationMail = async (userEmail, userName) => {
  // Email template as a string
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Welcome Email</title>
    </head>
    <body>
      <h2>Welcome, ${userName}!</h2>
      <p>Thank you for registering with our platform.</p>
      <p>We’re excited to have you on board. You can now access all features of our app.</p>
      <p>If you have any questions, feel free to reach out.</p>
      <br />
      <p>Best regards,<br /><strong>Your App Team</strong></p>
    </body>
    </html>
  `;

  // Send mail
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Welcome, ${userName}!`, 
    html: htmlContent,
  });
};
