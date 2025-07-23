import express from "express";
import {
  createInternship,
  updateInternship,
} from "../../controllers/internshipController/internshipControllers.js";

const router = express.Router();

router.post("/create-internship", createInternship);

router.put("/update-internship/:id", updateInternship);



export default router;
