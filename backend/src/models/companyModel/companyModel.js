import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    logo: {
      type: String, // URL to logo image
      default: "https://via.placeholder.com/150x150.png?text=Logo",
    },
    gst: {
      type: String,
      unique: true,
      sparse: true, // allows multiple nulls
      trim: true,
    },
    cin: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    },
    industry: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    headquarters: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    hrContact: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, trim: true },
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    foundedYear: {
      type: Number,
      min: 1800, // realistic lower limit
      max: new Date().getFullYear(),
    },
    socialLinks: {
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
      facebook: { type: String, trim: true },
      instagram: { type: String, trim: true },
    },
    address: {
      type: String,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
