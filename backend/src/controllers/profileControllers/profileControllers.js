import Profile from "../../models/profileModel/profileModel.js";
export const getProfileByUserId = async (req, res) => {
  try {
    const userId = req.user._id; // assumes auth middleware sets req.user
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract from URL params
    const updatedData = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      {
        $set: updatedData,
        $setOnInsert: { user: userId },
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
