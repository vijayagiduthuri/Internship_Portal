import Company from "../../models/companyModel/companyModel.js";
import { uploadToCloudinary } from "../../services/imageServices/uploadToCloudinary.js";
import Recruiter from "../../models/recruiterModel/recruiterModel.js";
import { sendMail } from "../../services/emailServices/sendMail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

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
    if (!companyData.name || !companyData.email || !companyData.hrContact?.name || !companyData.hrContact?.email
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
                message: 'A company with this email already exists.',
            });
        }
        let newCompany
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
            message: 'Company registered successfully.',
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
        console.error('Register Company Error:', err);
        return res.status(500).json({
            success: false,
            status: 500,
            message: 'Server error while registering company.',
            error: err.message,
        });
    }
}