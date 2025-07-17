import express from "express";
import { loginUser, updatePassword } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/update-password", updatePassword);

export default router;
