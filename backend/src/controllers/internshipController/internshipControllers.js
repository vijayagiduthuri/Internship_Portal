import crypto from "crypto"
import internshipSchema from "../../models/internshipModel/internshipModel";
import mongoose from "mongoose";
import { generateInternshipHash } from "../../services/internshipServices/generateInternshipHash";

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
        !Array.isArray(payload.skillsRequired) || payload.skillsRequired.length === 0 ||
        !payload.description ||
        !payload.responsibilities ||
        !Array.isArray(payload.responsibilities) || payload.responsibilities.length === 0 ||
        !payload.postedBy
    ) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: "Required fields: title, company, location, stipend, duration, startDate, applyBy, skillsRequired (non-empty array), description, responsibilities (non-empty array), postedBy.",
        });
    }

    try {
        // 1. create hash
        const postHash = generateInternshipHash(payload);

        // 2. look for duplicate
        const duplicate = await internshipSchema.findOne({ postHash });
        if (duplicate) {
            return res.status(409).json({
                success: false,
                message: "Duplicate internship post. A similar listing already exists."
            });
        }

        // 3. build new internship doc
        const newInternship = new internshipSchema({
            ...payload,
            uid: postHash,          // quick unique uid;
            postedBy: new mongoose.Types.ObjectId(payload.postedBy)
        });

        // 4. save
        await newInternship.save();

        res.status(201).json({
            success: true,
            message: "Internship created successfully.",
            data: newInternship
        });
    } catch (err) {
        console.error("Create‑Internship error:", err);
        res.status(500).json({
            success: false,
            message: "Server error while creating internship.",
            error: err.message
        });
    }
};