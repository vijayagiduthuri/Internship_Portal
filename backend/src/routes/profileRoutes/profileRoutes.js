import express from "express";
import { 
    updateProfile,
    getProfileByUserName
 } from "../../controllers/profileControllers/profileControllers.js";
  
 const router = express.Router();

 router.get("/get-profile/:userName", getProfileByUserName)
 
 router.put("/update-profile/:userName", updateProfile)
 
 export default router