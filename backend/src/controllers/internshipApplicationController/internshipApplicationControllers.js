import Application from "../../models/application.model.js";
import Internship from "../../models/internship.model.js"; // For validation (optional)

export const applyInternship = async (req, res) => {
  try {
    const {
      internshipId,
      fullName,
      email,
      phone,
      education,
      resumeUrl,
      coverLetter,
    } = req.body;

    const applicantId = req.user.id; // from JWT protect middleware

    // ✅ Optional: check if internship exists
    // const internshipExists = await Internship.findById(internshipId);
    // if (!internshipExists) {
    //   return res.status(404).json({ message: "Internship not found" });
    // }

    // ✅ Check if already applied
    const alreadyApplied = await Application.findOne({
      internshipId,
      applicantId,
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied to this internship" });
    }

    const application = new Application({
      internshipId,
      applicantId,
      fullName,
      email,
      phone,
      education,
      resumeUrl,
      coverLetter,
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully!",
      application,
    });
  } catch (error) {
    console.error("Error applying to internship:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
