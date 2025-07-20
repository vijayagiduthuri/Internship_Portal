import express from "express";
import upload from "../../middlewares/multer.js";
import {
    registerCompany,
    verifyCompany,
    generateCompanyAdminCredential
} from "../../controllers/authCompany/companyControllers.js";
const router = express.Router();
router.post("/register", upload.single("logo"), registerCompany);
router.post("/verify",verifyCompany)
router.post("/generate", generateCompanyAdminCredential)
export default router