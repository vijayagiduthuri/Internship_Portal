import Company from "../../models/companyModel/companyModel.js";
import Internship from "../../models/internshipModel/internshipModel.js";
import Application from "../../models/applicationModel/applicationModel.js";

//function to get admin stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalCompanies = await Company.countDocuments({ verified: true });
    const activeInternships = await Internship.countDocuments({
      isActive: true,
    });
    const pendingApprovals = await Company.countDocuments({
      verified: false,
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

// Function to get Monthly applications
export const getMonthlyApplicationStats = async (req, res) => {
  try {
    const stats = await Application.aggregate([
      {
        $match: {
          status: "applied", // optional filter
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$appliedAt" },
            month: { $month: "$appliedAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
          count: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Monthly application stats retrieved successfully",
      data: stats, // [{ month: "2025-07", count: 12 }, ...]
    });
  } catch (err) {
    console.error("Error getting application stats:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get application statistics.",
    });
  }
};