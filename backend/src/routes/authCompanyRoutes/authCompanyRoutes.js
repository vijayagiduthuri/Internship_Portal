import express from "express";
import upload from "../../middlewares/multer.js";
import {
  registerCompany,
  updateCompany,
} from "../../controllers/authCompany/companyControllers.js";

const router = express.Router();

router.post("/register", upload.single("logo"), registerCompany);

router.post("/update-company/:id", updateCompany);

export default router;
