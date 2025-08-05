import express from "express";
import { verifyCompany } from "../../controllers/adminController/adminCompanyVerification.js";
import { getDashboardStats, getMonthlyApplicationStats } from "../../controllers/adminController/adminStats.js";

const router = express.Router();

router.post("/verify-company/:companyId/:verify", verifyCompany);
router.get("/pending-companies", getPendingCompanies);

router.get("/admin-stats", getDashboardStats);

router.get("/monthly-applications", getMonthlyApplicationStats)

export default router;
