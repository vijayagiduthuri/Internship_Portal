import mongoose from "mongoose";
const internshipSchema = new mongoose.Schema({
  uid : {type:String, required: true, unique: true},
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  stipend: { type: String, required: true },
  duration: { type: String, required: true },
  startDate: { type: String, required: true },
  applyBy: { type: Date, required: true },
  skillsRequired: { type: [String], required: true },
  description: { type: String, required: true },
  responsibilities: { type: [String], required: true },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  openings: { type: Number },
  workType: { type: String, enum: ["Remote", "In-office", "Hybrid"] },
  perks: { type: [String] },
  isActive: { type: Boolean, default: true },
  category: { type: String },
});
const Internship = mongoose.model("Internship", internshipSchema);
export default Internship;
