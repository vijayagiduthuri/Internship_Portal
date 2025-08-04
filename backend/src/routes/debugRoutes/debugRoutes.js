import express from 'express';
import {
    DebugUser,
    DebugCompany,
    DebugInternship,
    DebugApplication,
    DebugProfile,
    DebugRecruiter,
    DebugOtp,
    DebugSavedInternship
} from "../../controllers/debugController/debugController.js"
const router = express.Router();
router.get("/users", DebugUser);

router.get("/companies", DebugCompany);

router.get("/applications", DebugApplication);

router.get("/internships", DebugInternship);

router.get("/otps", DebugOtp);

router.get("/profiles", DebugProfile);

router.get("/recruiters", DebugRecruiter);

router.get("/saved-internships", DebugSavedInternship);

export default router;