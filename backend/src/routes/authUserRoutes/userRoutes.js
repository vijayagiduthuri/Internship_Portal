import express from "express";
import {
  loginUser,
  updatePassword,
  registerUser,
  forgotPassword,
  logoutUser,
  getApplicationsByApplicantId,
} from "../../controllers/authUsers/userControllers.js";
import { protectRoute } from "../../middlewares/jwtToken.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/update-password", protectRoute, updatePassword);

router.post("/forgot-password", forgotPassword);

router.post("/logout", logoutUser);

router.get(
  "/get-all-internships-applied/:applicantId",
  getApplicationsByApplicantId
);

export default router;
