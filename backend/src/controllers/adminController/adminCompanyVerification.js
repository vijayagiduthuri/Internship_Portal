import Company from "../../models/companyModel/companyModel.js";
import Recruiter from "../../models/recruiterModel/recruiterModel.js";
import { sendMail } from "../../services/emailServices/sendMail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";


export const verifyCompany = async (req, res) => {
  const { companyId, verify } = req.params;

  if (!companyId || typeof verify === "undefined") {
    return res.status(400).json({
      success: false,
      message: "Company ID and verify boolean are required.",
    });
  }

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const lowerEmail = company.email.toLowerCase().trim();

    if (verify === "true") {
      if (company.verified) {
        return res.status(200).json({
          success: true,
          message: "Company is already verified.",
        });
      }

      // ✅ Mark company as verified
      company.verified = true;
      await company.save();

      // 🚫 Check if admin already exists
      const emailExists = await Recruiter.findOne({ email: lowerEmail });
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "Admin credential already exists for this company.",
        });
      }

      // 🔐 Generate credentials
      const plainPassword = crypto.randomBytes(6).toString("hex");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      const adminCredential = new Recruiter({
        companyId: company._id,
        name: company.hrContact.name,
        email: lowerEmail,
        password: hashedPassword,
        role: "admin",
      });
      await adminCredential.save();

      // 📧 Send success email
      const credentialHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f6f6f6; color: #333;">
                <h2 style="color: #2c3e50;">✅ Your Company Has Been Verified</h2>

                <p>Dear ${company.name},</p>

                <p>We’re happy to inform you that <strong>${company.name}</strong> has been successfully verified on our platform. You now have access to your company dashboard where you can:</p>

                <ul style="line-height: 1.6;">
                <li>Manage recruiter accounts</li>
                <li>Post internship and job opportunities</li>
                <li>Track applications and engagement</li>
                </ul>

                <h3 style="margin-top: 20px;">🔐 Admin Login Credentials</h3>
                <p>
                <strong>Email:</strong> ${lowerEmail}<br />
                <strong>Temporary Password:</strong> ${plainPassword}
                </p>

                <p>Please log in using the credentials above and make sure to update your password after your first login.</p>

                <a href="https://your-portal-link.com/login" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #2c3e50; color: white; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>

                <hr style="margin-top: 30px; border: none; border-top: 1px solid #ccc;" />

                <p style="font-size: 12px; color: #888;">
                This is an automated message. If you have any questions or concerns, please contact our support team.
                </p>
            </div>
            `;

      await sendMail(
        lowerEmail,
        credentialHtml,
        "Your Company is Verified – Admin Credentials Inside"
      );

      return res.status(200).json({
        success: true,
        message: "Company verified, credentials generated, email sent.",
      });
    } else {
      // ❌ If not verified — send rejection email and delete company
      const rejectionHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fff3f3; color: #333;">
            <h2 style="color: #c0392b;">❌ Company Verification Rejected</h2>
            <p>Dear ${company.name},</p>
            <p>We regret to inform you that your company verification request has been declined after review.</p>
            <p>If you believe this was a mistake, please reach out to support with additional documentation.</p>
            <p>Regards,<br>The Verification Team</p>
        </div>`;

      await sendMail(
        lowerEmail,
        rejectionHtml,
        "Company Verification Rejected"
      );

      await Company.findByIdAndDelete(companyId);

      return res.status(200).json({
        success: true,
        message: "Company verification rejected. Company deleted and email sent.",
      });
    }
  } catch (err) {
    console.error("Error verifying company:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during company verification.",
      error: err.message,
    });
  }
};

export const getPendingCompanies = async (req, res) => {
  try {
    const pendingCompanies = await Company.find({ verified: false })
      .select('name email industry description website hrContact headquarters createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json(pendingCompanies);
  } catch (error) {
    console.error("Error fetching pending companies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};