import express from "express";
import { createInternship } from "../../controllers/internshipController/internshipControllers.js";

const router = express.Router();

router.post("/create-internship", createInternship);
export default router;