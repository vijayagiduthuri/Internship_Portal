import express from "express";
import {
    registerCompany
} from "../../controllers/authCompany/companyControllers.js";
const router = express.Router();
router.post("/register", registerCompany);
export default router