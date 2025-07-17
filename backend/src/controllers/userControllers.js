import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import { sendOtp, verifyOtp } from '../lib/sendOtp.js';
import { sendMail } from './sendMail.js';

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
          <h2>🔐 Your One-Time Password (OTP)</h2>
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