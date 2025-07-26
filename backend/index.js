import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./src/routes/authUserRoutes/userRoutes.js";
import authCompanyRoutes from "./src/routes/authCompanyRoutes/authCompanyRoutes.js";
import internshipRoutes from "./src/routes/internshipRoutes/internshipRoutes.js";
import profileRoutes from "./src/routes/profileRoutes/profileRoutes.js";
import recruiterRoutes from "./src/routes/authRecruiterRoutes/authRecruiterRoutes.js"
import { connectDB } from "./src/lib/db.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Import user routes
app.use("/api/authUsers", userRoutes);
app.use("/api/authCompany", authCompanyRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/authRecruiters", recruiterRoutes);

// Set the port from environment variable or default to 9000
const PORT = process.env.PORT || 9000;

//running the server
app.listen(PORT, () => {
  console.log("Server is running on PORT : " + PORT);
  connectDB();
});
