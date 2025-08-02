// Remove this during Production Phase
import User from "../../models/userModel/userModel.js";
import Application from "../../models/applicationModel/applicationModel.js";
import Recruiter from "../../models/recruiterModel/recruiterModel.js";
import Company from "../../models/companyModel/companyModel.js"
import Internship from "../../models/internshipModel/internshipModel.js";
import Otp from "../../models/otpModel/otpModel.js";
import Profile from "../../models/profileModel/profileModel.js"
import SavedInternship from "../../models/savedInternshipModel/savedInternshipModel.js";

export const DebugUser = async (req, res) => {
    try {
    const users = await User.find({});
    res.json(users); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
};

export const DebugRecruiter = async (req, res) => {
    try {
    const recruiters = await Recruiter.find({});
    res.json(recruiters); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recruiters', details: err.message });
  }
};

export const DebugCompany = async (req, res) => {
    try {
    const companies = await Company.find({});
    res.json(companies); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch companies', details: err.message });
  }
};

export const DebugInternship = async (req, res) => {
    try {
    const internships = await Internship.find({});
    res.json(internships); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch internships', details: err.message });
  }
};

export const DebugApplication = async (req, res) => {
    try {
    const applications = await Application.find({});
    res.json(applications); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications', details: err.message });
  }
};

export const DebugProfile = async (req, res) => {
    try {
    const profiles = await Profile.find({});
    res.json(profiles); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profiles', details: err.message });
  }
};

export const DebugSavedInternship = async (req, res) => {
    try {
    const savedInternships = await SavedInternship.find({});
    res.json(savedInternships); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch savedInternships', details: err.message });
  }
};

export const DebugOtp = async (req, res) => {
    try {
    const otps = await Otp.find({});
    res.json(otps); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch otps', details: err.message });
  }
};