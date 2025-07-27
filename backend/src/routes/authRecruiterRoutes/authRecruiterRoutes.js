import express from "express";
import {
  createRecruiter,
  forgotRecruiterPassword,
  loginRecruiter,
  logoutRecruiter,
  updateRecruiterPassword,
} from "../../controllers/authRecruiters/recruiterControllers.js";
import { checkRecruiter } from "../../middlewares/recruiterMiddlewares.js";

const router = express.Router();

router.post("/login", loginRecruiter);

router.post("/create-recruiter", checkRecruiter, createRecruiter);

router.post("/update-password", checkRecruiter, updateRecruiterPassword);

router.post("/forgot-password", forgotRecruiterPassword);

router.post("/logout", logoutRecruiter);

export default router;
