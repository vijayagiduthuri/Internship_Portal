import express from "express";
import { createInternship, deleteInternship, getAllInternships, getInternshipById } from "../../controllers/internshipController/internshipControllers.js";

const router = express.Router();

router.post("/create-internship", createInternship);

router.get("/get-all-internships",getAllInternships );

router.delete("/delete-internship/:id",deleteInternship );

router.get("/get-internship-id/:id", getInternshipById)

export default router;