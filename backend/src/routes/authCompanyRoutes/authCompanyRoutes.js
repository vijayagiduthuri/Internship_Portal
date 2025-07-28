import express from "express";
import upload from "../../middlewares/multer.js";
import {
  registerCompany,
  verifyCompany,
  generateCompanyAdminCredential,
  updateCompany,
} from "../../controllers/authCompany/companyControllers.js";

const router = express.Router();

router.post("/register", upload.single("logo"), registerCompany);

router.post("/verify", verifyCompany);

router.post("/generate", generateCompanyAdminCredential);

router.post("/update-company/:id", updateCompany);

export default router;
