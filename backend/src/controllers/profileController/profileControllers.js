import Profile from "../../models/profileModel/profileModel.js";
import User from "../../models/userModel/userModel.js";

// Get Profile of a UserName
export const getProfileByUserName = async (req, res) => {
  try {
    const userName = req.params.userName; // e.g., /api/profile/:userName

    // Step 1: Check if the user exists in User model
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Look for profile with this username
    const profile = await Profile.findOne({ userName });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Profile using Username (which exists in user model)
export const updateProfile = async (req, res) => {
  try {
    const userName = req.params.userName; // Extract from URL params
    const updatedData = req.body;

    const userExists = await User.findOne({ userName });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userName: userName },
      {
        $set: updatedData,
        $setOnInsert: { userName: userName },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
