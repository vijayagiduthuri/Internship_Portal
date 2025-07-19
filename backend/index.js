import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./src/routes/authUserRoutes/userRoutes.js";
import { connectDB } from "./src/lib/db.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Import user routes
app.use("/api/auth", userRoutes);

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Set the port from environment variable or default to 9000
const PORT = process.env.PORT || 9000;

//running the server
app.listen(PORT, () => {
  console.log("Server is running on PORT : " + PORT);
  connectDB();
});
