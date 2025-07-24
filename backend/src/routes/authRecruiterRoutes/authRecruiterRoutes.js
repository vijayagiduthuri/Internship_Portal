import express from "express";
import { loginRecruiter } from "../../controllers/authRecruiters/recruiterControllers.js";

const router = express.Router();

router.post("/login", loginRecruiter);

export default router;