import express from "express";

import {
  createInternship,
  updateInternship,
  getAllInternships,
  getInternshipById,
  deleteInternship
} from "../../controllers/internshipController/internshipControllers.js";
import { 
    applyInternship
 } from "../../controllers/internshipApplicationController/internshipApplicationControllers.js";
import { protectRoute } from "../../middlewares/jwtToken.js";
const router = express.Router();

router.post("/create-internship", createInternship);

router.get("/get-all-internships", getAllInternships);

router.get("/get-internship-id/:id", getInternshipById);

router.put("/update-internship/:id", updateInternship);

router.delete("/delete-internship/:id", deleteInternship);

router.post("/apply-internship",protectRoute, applyInternship)
export default router;
