import express from "express";
import { verifyCompany } from "../../controllers/adminController/adminCompanyVerification.js";

const router = express.Router();

router.post("/verify-company/:companyId/:verify", verifyCompany);

export default router;
