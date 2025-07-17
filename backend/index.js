import express from 'express';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set the port from environment variable or default to 9000
const PORT = process.env.PORT || 9000;

//middleware

//parse cookies
app.use(cookieParser());
// CORS configuration
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))

//running the server
server.listen(PORT, () => {
    console.log('Server is running on PORT : ' + PORT);
    // Connect to the database
    connectDB();
})