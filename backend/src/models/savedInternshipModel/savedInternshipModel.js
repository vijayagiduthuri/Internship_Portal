// models/savedInternshipModel.js
import mongoose from "mongoose";

const savedInternshipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One entry per user
    },
    internships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SavedInternship = mongoose.model("SavedInternship", savedInternshipSchema);
export default SavedInternship