import bcrypt from "bcrypt";
import crypto from 'crypto'
import { generateToken } from "../../lib/utils.js";
import Recruiter from "../../models/recruiterModel/recruiterModel.js";
import { sendMail } from "../../services/emailServices/sendMail.js";
import { sendOtp, verifyOtp } from "../../services/emailServices/sendOtp.js";
import { generateOtpToken,verifyOtpToken } from "../../services/emailServices/otpToken.js";

//Function to login a recruiter
export const loginRecruiter = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email) {
      return res.status(400).json({ message: "Please enter your email" });
    }
    if (!password) {
      return res.status(400).json({ message: "Please enter your password" });
    }

    // Find user by email
    const user = await Recruiter.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    generateToken(user._id, res);
    // If everything is okay, login successful
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Function to create a recruiter
export const createRecruiter = async (req, res) => {
  const { email,name } = req.body;
  if (req.recruiter.role !== 'admin')
  {
        return res.status(403).json({ message: "Unauthorized: Only admin recruiters can create new recruiters." });
  }
  try {
    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    }

    // Check if recruiter already exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(409).json({ message: "Recruiter already exists" });
    }

    // Generate random password
    const plainPassword = crypto.randomBytes(6).toString("hex"); // 12-char hex password

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Create new recruiter
    const newRecruiter = new Recruiter({
      name:name,
      companyId:req.recruiter.companyId,
      email:email,
      password: hashedPassword,
      // You can set other default fields if needed
    });

    await newRecruiter.save();

    // Email content
    const subject = "Your Recruiter Portal Credentials";
    const htmlContent = `
      <h2>Welcome to the Internship Portal!</h2>
      <p>You have been registered as a recruiter.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${plainPassword}</p>
      <p>Please log in and update your profile and password.</p>
    `;

    // Send email with the credentials
    const mailResponse = await sendMail(email, htmlContent, subject);

    if (mailResponse.success) {
      res.status(201).json({ message: "Recruiter created and email sent successfully" });
    } else {
      res.status(500).json({ message: "Recruiter created but failed to send email" });
    }
  } catch (error) {
    console.error("Create recruiter error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Function to update recruiter password
export const updateRecruiterPassword = async (req, res) => {
  const email = String(req.body.email || "").trim();
  const currentPassword = String(req.body.currentPassword || "").trim();
  const newPassword = String(req.body.newPassword || "").trim();

  try {
    // Input validations
    if (!email) {
      return res.status(400).json({ message: "Please enter your email" });
    }
    if (!currentPassword) {
      return res
        .status(400)
        .json({ message: "Please enter your current password" });
    }
    if (!newPassword) {
      return res.status(400).json({ message: "Please enter a new password" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters long" });
    }
    if (newPassword.includes(" ") || newPassword.length > 100) {
      return res.status(400).json({ message: "Invalid new password content" });
    }
    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password cannot be the same as current password",
      });
    }

    // Find recruiter by email
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    // Validate current password
    const isMatch = await bcrypt.compare(currentPassword, recruiter.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update and save
    recruiter.password = hashedPassword;
    recruiter.updatedAt = new Date();
    await recruiter.save();

    res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Update password error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Function to set password of a recruiter(forgot)
export const forgotRecruiterPassword = async (req, res) => {
  const { email, otp, resetToken, newPassword } = req.body;
  const lowerEmail = email?.toLowerCase();

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const recruiter = await Recruiter.findOne({ email: lowerEmail });

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    // ⿡ First hit — only email: send OTP to recruiter
    if (!otp && !newPassword) {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
          <h2>🔐 Recruiter Password Reset Request</h2>
          <p>Hi ${recruiter.userName || "Recruiter"},</p>
          <p>You requested to reset your password on the Internship Portal.</p>
          <p>Please use the OTP below to proceed:</p>
          <p style="font-size: 26px; font-weight: bold; color: #2c3e50;">{{OTP}}</p>
          <p>This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
          <p>– Internship Portal Team</p>
        </div>
      `;

      return await sendOtp(req, res, htmlContent);
    }

    // ⿢ Second hit — email + otp: verify OTP and send token
    if (otp && !newPassword && !resetToken) {
      const otpResult = await verifyOtp(lowerEmail, otp); // returns { success, status, message }
      if (!otpResult.success) {
        return res.status(otpResult.status).json(otpResult);
      }

      const token = generateOtpToken(lowerEmail); // valid for 5 mins
      return res.status(200).json({
        success: true,
        status: 200,
        message: "OTP verified. Use the reset token to set a new password.",
        resetToken: token,
        expiresIn: 300,
      });
    }

    // ⿣ Third hit — email + resetToken + newPassword: verify token and update password
    if (newPassword && resetToken) {
      const tokenResult = await verifyOtpToken(lowerEmail, resetToken);
      if (!tokenResult.success) {
        return res.status(tokenResult.status).json(tokenResult);
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters.",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await Recruiter.updateOne(
        { email: lowerEmail },
        { $set: { password: hashedPassword } }
      );

      return res.status(200).json({
        success: true,
        message: "Password updated successfully.",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Required fields not provided",
    });
  } catch (err) {
    console.error("Forgot‑Password Error (Recruiter):", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

//Function to logout recruiter
export const logoutRecruiter = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}