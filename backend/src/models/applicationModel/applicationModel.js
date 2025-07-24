import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    internshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    education: {
      college: String,
      degree: String,
      branch: String,
      yearOfPassing: Number,
    },
    resumeUrl: {
      type: String, // This should be Cloudinary or other uploaded link
      required: true,
    },
    coverLetter: {
      type: String,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "hired"],
      default: "applied",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
