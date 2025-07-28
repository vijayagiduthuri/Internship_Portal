import crypto from "crypto";
import Internship from "../../models/internshipModel/internshipModel.js";
import Application from "../../models/applicationModel/applicationModel.js";
import mongoose from "mongoose";
import { generateInternshipHash } from "../../services/internshipServices/generateInternshipHash.js";

// Create Internship
export const createInternship = async (req, res) => {
  const payload = req.body;
  if (
    !payload.title ||
    !payload.company ||
    !payload.location ||
    !payload.stipend ||
    !payload.duration ||
    !payload.startDate ||
    !payload.applyBy ||
    !payload.skillsRequired ||
    !Array.isArray(payload.skillsRequired) ||
    payload.skillsRequired.length === 0 ||
    !payload.description ||
    !payload.responsibilities ||
    !Array.isArray(payload.responsibilities) ||
    payload.responsibilities.length === 0 
  ) {
    return res.status(400).json({
      success: false,
      status: 400,
      message:
        "Required fields: title, company, location, stipend, duration, startDate, applyBy, skillsRequired (non-empty array), description, responsibilities (non-empty array).",
    });
  }
  try {
    // 1. create hash
    const postHash = await generateInternshipHash(payload);

    // 2. look for duplicate
    const duplicate = await Internship.findOne({ uid: postHash });
    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Duplicate internship post. A similar listing already exists."
      });
    }
    // 3. build new internship doc
    const newInternship = new Internship({
      ...payload,
      uid: postHash,          // quick unique uid;
      recruiterId: req.recruiter.id,
      companyId: req.recruiter.companyId

    });
    // 4. save
    await newInternship.save();

    res.status(201).json({
      success: true,
      message: "Internship created successfully.",
      data: newInternship,
    });
  } catch (err) {
    console.error("Create‑Internship error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while creating internship.",
      error: err.message,
    });
  }
};

// Get All internships
export const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch internships", error });
  }
};

// Delete Internship
export const deleteInternship = async (req, res) => {
  const { id } = req.params; // extract the internship id from URL

  try {
    const deleted = await Internship.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("Delete‑Internship error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting internship",
      error: error.message,
    });
  }
};

// Get Internship
export const getInternshipById = async (req, res) => {
  const { id } = req.params; // get internship id from URL params
  try {
    const internship = await Internship.findById(id);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Internship fetched successfully",
      data: internship,
    });
  } catch (error) {
    console.error("Get-Internship error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching internship",
      error: error.message,
    });
  }
};

//update internship
export const updateInternship = async (req, res) => {
  const { id } = req.params; // internship id
  const updates = req.body;

  // Prevent changing the uid
  if (updates.uid) {
    delete updates.uid;
  }

  try {
    const updatedInternship = await Internship.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedInternship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship updated successfully",
      data: updatedInternship,
    });
  } catch (err) {
    console.error("Update‑Internship error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating internship.",
      error: err.message,
    });
  }
};

// Get Applications by Internship Id
export const getApplicationsByInternshipId = async (req, res) => {
  try {
    const internshipId = req.params.id;
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    const applications = await Application.find({ internshipId });

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this internship" });
    }

    res.status(200).json({
      message: "Applications fetched successfully",
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
