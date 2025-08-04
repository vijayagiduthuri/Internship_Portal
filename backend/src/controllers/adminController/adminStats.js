import Company from "../../models/companyModel/companyModel.js";
import Internship from "../../models/internshipModel/internshipModel.js";
import Application from "../../models/applicationModel/applicationModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalCompanies = await Company.countDocuments({ isApproved: true });
    const activeInternships = await Internship.countDocuments({
      status: "active",
    });
    const pendingApprovals = await Company.countDocuments({
      isApproved: false,
    });
    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      totalCompanies,
      activeInternships,
      pendingApprovals,
      totalApplications,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
