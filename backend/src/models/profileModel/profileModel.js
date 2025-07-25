import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },

    // Personal Details
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    phone: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    profileImage: { type: String }, // URL of profile image (optional)

    // Professional Details
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
        grade: String,
      },
    ],
    experience: [
      {
        company: String,
        title: String,
        location: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    skills: [String],
    certifications: [
      {
        title: String,
        issuingOrganization: String,
        issueDate: Date,
        credentialId: String,
        credentialURL: String,
      },
    ],

    // Resume upload
    resumeURL: { type: String }, // Cloudinary or other file hosting link

    // Social Links (Optional)
    socialLinks: {
      linkedin: { type: String },
      github: { type: String },
      portfolio: { type: String },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
