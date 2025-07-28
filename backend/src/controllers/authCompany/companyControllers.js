import Company from "../../models/companyModel/companyModel.js";
import { uploadToCloudinary } from "../../services/imageServices/uploadToCloudinary.js";
import Recruiter from "../../models/recruiterModel/recruiterModel.js";
import { sendMail } from "../../services/emailServices/sendMail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

//Function to register a company 
export const registerCompany = async (req, res) => {
  try {
    const companyData = req.body;
    console.log(companyData);
    if (typeof companyData.hrContact === "string") {
      companyData.hrContact = JSON.parse(companyData.hrContact);
    }
    if (typeof companyData.socialLinks === "string") {
      companyData.socialLinks = JSON.parse(companyData.socialLinks);
    }
    // Check required fields are present or not
    if (
      !companyData.name ||
      !companyData.email ||
      !companyData.hrContact?.name ||
      !companyData.hrContact?.email
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Company name, email, and HR contact name/email are required.",
      });
    }

    const lowerEmail = companyData.email.toLowerCase().trim();
    // company email check if exsists in db
    const existingCompany = await Company.findOne({ email: lowerEmail });
    if (existingCompany) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "A company with this email already exists.",
      });
    }
    let newCompany;
    let logoUrl = null;
    if (req.file) {
      logoUrl = await uploadToCloudinary(req.file.buffer); // returns
      newCompany = new Company({
        ...companyData,
        email: lowerEmail,
        logo: logoUrl,
        hrContact: {
          name: companyData.hrContact.name.trim(),
          email: companyData.hrContact.email.toLowerCase().trim(),
          phone: companyData.hrContact.phone?.trim() || null,
        },
      });
    }
    if (!logoUrl) {
      newCompany = new Company({
        ...companyData,
        email: lowerEmail,
        hrContact: {
          name: companyData.hrContact.name.trim(),
          email: companyData.hrContact.email.toLowerCase().trim(),
          phone: companyData.hrContact.phone?.trim() || null,
        },
      });
    }
    await newCompany.save();
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Company registered successfully.",
      data: newCompany,
    });
  } catch (err) {
    if (err.code === 11000) {
      const dupField = Object.keys(err.keyValue)[0];
      return res.status(409).json({
        success: false,
        status: 409,
        message: `Duplicate value for field: ${dupField}`,
      });
    }
    console.error("Register Company Error:", err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server error while registering company.",
      error: err.message,
    });
  }
};

//Function to verify company
export const verifyCompany = async (req, res) => {
  const { email } = req.body;
  const lowerEmail = email.toLowerCase().trim();
  if (!lowerEmail) {
    return res.status(400).json({
      success: false,
      message: "Company email is required to verify the company.",
    });
  }

  try {
    const company = await Company.findOne({ email: lowerEmail });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    if (company.verified) {
      return res.status(200).json({
        success: true,
        message: "Company is already verified.",
      });
    }

    company.verified = true;
    await company.save();

    return res.status(200).json({
      success: true,
      message: "Company has been verified successfully.",
      data: company,
    });
  } catch (err) {
    console.error("Error verifying company:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while verifying company.",
      error: err.message,
    });
  }
};

//Function to generate admin credientials
export const generateCompanyAdminCredential = async (req, res) => {
  const { email } = req.body;
  const lowerEmail = email.toLowerCase().trim();
  if (!lowerEmail) {
    return res
      .status(400)
      .json({ success: false, message: "Company email is required." });
  }
  try {
    // 1. Check if company exists and is verified
    const company = await Company.findOne({ email: lowerEmail });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    if (!company.verified) {
      return res
        .status(403)
        .json({ success: false, message: "Company is not verified." });
    }

    // 2. Check if admin credential already exists
    const emailExists = await Recruiter.findOne({ email: lowerEmail });
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Admin credential already exists for this company",
      });
    }
    // 3. Generate random password
    const plainPassword = crypto.randomBytes(6).toString("hex"); // 12-char password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // 4. Create admin recruiter
    const adminCredential = new Recruiter({
      companyId: company._id,
      name: company.hrContact.name, // 🧠 using HR name from company
      email: lowerEmail,
      password: hashedPassword,
      role: "admin",
    });
    await adminCredential.save();

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

    // 5. Return success
    return res.status(201).json({
      success: true,
      message: "Admin credentials generated and email sent.",
    });
  } catch (err) {
    console.error("Credential generation error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while generating credentials.",
      error: err.message,
    });
  }
};

//Function to update Comapny
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params; // MongoDB ObjectId
    const updates = req.body;

    // Prevent changing unique identifiers directly, if needed
    delete updates._id;
    delete updates.email; // if email shouldn't be changed
    delete updates.gst;   // optionally prevent gst/cin changes
    delete updates.cin;

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({
      message: "Failed to update company",
      error: error.message,
    });
  }
};