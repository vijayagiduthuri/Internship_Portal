import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async (userEmail, htmlContent, subject) => {

  //Email Service Bypassed
    if (process.env.DISABLE_EMAILS === "true") {
      console.log("=== Email Sending Bypassed ===");
      console.log("To:", userEmail);
      console.log("Subject:", subject);
      console.log("HTML Content:", htmlContent);
      console.log("=== End of Email ===");
      return {
        success: true,
        message: "Email sent successfully",
      };
    }

  // Send mail
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: subject,
      html: htmlContent,
    });

    // Optionally log or return the message ID
    console.log("Email sent: ", info.messageId);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { success: false, message: "Failed to send email", error };
  }
};
