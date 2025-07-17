import express from "express";
import {
  loginUser,
  updatePassword,
  registerUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/update-password", updatePassword);

export default router;
