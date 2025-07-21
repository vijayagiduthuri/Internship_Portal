import express from "express";
import { createInternship } from "../../controllers/internshipController/internshipControllers";

const router = express.Router();

router.post("/create-internship", createInternship);
export default router;