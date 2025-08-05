import express from "express";
import { verifyCompany } from "../../controllers/adminController/adminCompanyVerification.js";
import { getDashboardStats } from "../../controllers/adminController/adminStats.js";

const router = express.Router();

router.post("/verify-company/:companyId/:verify", verifyCompany);

router.get("/admin-stats", getDashboardStats);

export default router;
