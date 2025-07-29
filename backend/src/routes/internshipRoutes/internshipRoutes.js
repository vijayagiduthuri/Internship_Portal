import express from "express";
import {
  createInternship,
  updateInternship,
  getAllInternships,
  getInternshipById,
  deleteInternship,
  getApplicationsByInternshipId,
  saveInternship,
} from "../../controllers/internshipController/internshipControllers.js";
import { applyInternship } from "../../controllers/internshipApplicationController/internshipApplicationControllers.js";
import { protectRoute } from "../../middlewares/jwtToken.js";
import {
  checkRecruiter,
  checkRecuiterOrganisation,
} from "../../middlewares/recruiterMiddlewares.js";

const router = express.Router();

router.post("/create-internship", checkRecruiter, createInternship);

router.post("/apply-internship", protectRoute, applyInternship);

router.get("/get-all-internships", protectRoute, getAllInternships);

router.get("/get-internship-id/:id", getInternshipById);

router.get(
  "/get-applications-by-id/:id",
  checkRecruiter,
  checkRecuiterOrganisation,
  getApplicationsByInternshipId
);

router.put(
  "/update-internship/:id",
  checkRecruiter,
  checkRecuiterOrganisation,
  updateInternship
);

router.delete(
  "/delete-internship/:id",
  checkRecruiter,
  checkRecuiterOrganisation,
  deleteInternship
);

router.post("/save-internship",protectRoute,saveInternship)

export default router;
