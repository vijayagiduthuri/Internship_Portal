import bcrypt from "bcrypt";
import { generateToken } from "../../lib/utils.js";
import Recruiter from "../../models/recruiterModel/recruiterModel.js";

//Function to login a user
export const loginRecruiter = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email) {
      return res.status(400).json({ message: "Please enter your email" });
    }
    if (!password) {
      return res.status(400).json({ message: "Please enter your password" });
    }

    // Find user by email
    const user = await Recruiter.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    generateToken(user._id, res);
    // If everything is okay, login successful
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
