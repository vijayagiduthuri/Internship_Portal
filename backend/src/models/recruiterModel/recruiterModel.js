import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      match: [/.+\@.+\..+/, "Invalid email format"],
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "recruiter", "viewer"],
      default: "recruiter",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Recruiter = mongoose.model("Recruiter", recruiterSchema);
export default Recruiter;
