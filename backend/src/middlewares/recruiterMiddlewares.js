import jwt from 'jsonwebtoken';
import Recruiter from "../models/recruiterModel/recruiterModel.js";
import Internship from '../models/internshipModel/internshipModel.js';

export const checkRecruiter = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const recruiter = await Recruiter.findOne({ _id: decoded.userId });
    if (!recruiter) {
      return res.status(403).json({ message: "Access denied. Not a recruiter" });
    }

    req.recruiter = recruiter;
    next(); // Authorized, proceed to the route

  } catch (e) {
    console.error("Error in checkRecruiter middleware:", e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkRecuiterOrganisation = async(req, res, next) =>{
    const internshipId = req.params.id ;
    if (!internshipId) {
      return res.status(400).json({ message: "Internship ID is required" });
    }

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    // Check if the recruiter's company matches the internship's company
    if (
      String(internship.companyId) !== String(req.recruiter.companyId)
    ) {
      return res.status(403).json({
        message: "Access denied. You do not belong to the company that posted this internship",
      });
    }
    next(); //Recruiter belongs to same company as recruiter
}
