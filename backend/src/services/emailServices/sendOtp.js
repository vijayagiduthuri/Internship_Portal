import dotenv from 'dotenv';
import Otp from '../../models/otpModel/otpModel.js';
import { sendMail } from './sendMail.js';
import { generateOtpToken } from './otpToken.js';
dotenv.config();

export const sendOtp = async (req, res, htmlContent) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
      const htmlReplacedContent = htmlContent
        .replace(/{{OTP}}/g, otpCode);
    try {
        await Otp.findOneAndUpdate(
            { email: email.toLowerCase() },
            { otp: otpCode, otpExpiry: expiry },
            { upsert: true, new: true }
        );
        // Simulate sending email
        await sendMail(email, htmlReplacedContent, 'Your OTP Code');
        console.log(`📧 Sent OTP ${otpCode} to ${email}`);
        return res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error sending OTP', error: err.message });
    }
}
export const verifyOtp = async (email, otp) => {
    if (!email || !otp) {
        return {
            success: false,
            status: 400,
            message: 'Email and OTP are required',
        };
    }

    try {
        const record = await Otp.findOne({ email: email.toLowerCase() });

        if (!record) {
            return {
                success: false,
                status: 404,
                message: 'No OTP found for this email',
            };
        }

        if (record.otp !== otp) {
            return {
                success: false,
                status: 401,
                message: 'Invalid OTP',
            };
        }

        if (record.otpExpiry < new Date()) {
            return {
                success: false,
                status: 410,
                message: 'OTP expired',
            };
        }
        const token = await generateOtpToken(email.toLowerCase());
        await Otp.deleteOne({ email: email.toLowerCase() });
        return {
            success: true,
            status: 200,
            message: 'OTP verified successfully',
            verifyToken: token
        };
    } catch (err) {
        return {
            success: false,
            status: 500,
            message: 'Error verifying OTP',
            error: err.message,
        };
    }
};
