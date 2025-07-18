import express from "express";
import {
  loginUser,
  updatePassword,
  registerUser,
  forgotPassword,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/update-password", updatePassword);

router.post('/forgot-password',forgotPassword)

export default router;
