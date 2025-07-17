import dotenv from 'dotenv';
import Otp from '../models/otpModel';
import { sendMail } from './sendMail';
dotenv.config();

export const sendOtp = async (req, res, htmlContent) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    try {
        await Otp.findOneAndUpdate(
            { userEmail: email.toLowerCase() },
            { otp: otpCode, otpExpiry: expiry },
            { upsert: true, new: true }
        );
        // Simulate sending email
        await sendMail(email, htmlContent, 'Your OTP Code');
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
        const record = await Otp.findOne({ userEmail: email.toLowerCase() });

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

        await Otp.deleteOne({ userEmail: email.toLowerCase() });

        return {
            success: true,
            message: 'OTP verified successfully',
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