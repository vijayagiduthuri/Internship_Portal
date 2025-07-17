import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import { sendOtp, verifyOtp } from '../lib/sendOtp.js';
import { sendMail } from '../lib/sendMail.js';

dotenv.config();

export const registerUser = async (req, res) => {
  const { email, userName, password, otp } = req.body;

  if (!email || !userName || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email, username, and password are required.',
    });
  }

  const lowerEmail = email.toLowerCase();

  try {
    const existingUser = await User.findOne({ userEmail: lowerEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists.',
      });
    }

    // STEP 1: No OTP provided → Send OTP
    if (!otp) {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 10px; background-color: #fafafa;">
          <h2>🔐 Your One-Time Password ${otp}</h2>
          <p>Hello ${userName},</p>
          <p>Use the OTP below to complete your registration:</p>
          <p style="font-size: 24px; font-weight: bold; color: #e74c3c;">[ OTP will be emailed ]</p>
          <p>This OTP is valid for <strong>5 minutes</strong>.</p>
        </div>
      `;
      return await sendOtp(req, res, htmlContent);
    }

    // STEP 2: OTP provided → verify OTP (new logic)
    const otpResult = await verifyOtp(lowerEmail, otp);
    if (!otpResult.success) {
      return res.status(otpResult.status).json(otpResult);
    }

    // STEP 3: Hash password and create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName,
      userEmail: lowerEmail,
      password: hashedPassword,
    });

    await newUser.save();

    const welcomeHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f6f6f6;">
        <h2 style="color: #2c3e50;">🎉 Welcome, ${userName}!</h2>
        <p>We're excited to have you on board.</p>
        <p>You can now log in and start using our services.</p>
      </div>
    `;
    await sendMail(lowerEmail, welcomeHtml, 'Welcome to Our Platform!');

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Welcome email sent.',
    });

  } catch (err) {
    console.error('Registration Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};

//Function to login a user
export const loginUser = async (req, res) => {
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

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

//Function to update password
export const updatePassword = async (req, res) => {
  // Convert inputs to strings to avoid type errors
  const email = String(req.body.email || "").trim();
  const currentPassword = String(req.body.currentPassword || "").trim();
  const newPassword = String(req.body.newPassword || "").trim();

  try {
    // Check if all fields are present
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

    // Validate new password length and content
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters long" });
    }
    if (newPassword.includes(" ") || newPassword.length > 100) {
      return res.status(400).json({ message: "Invalid new password content" });
    }

    // Check if current password is the same as new password
    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password cannot be the same as current password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedNewPassword;
    user.updatedAt = new Date();
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Password update error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
