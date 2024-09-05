const User = require("../models/userModel").User;
const { cloudinary } = require('../helpers/cloudinary');

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name, email, bio, skills } = req.body;
    const updateData = { name, email };

    if (bio) updateData['profile.bio'] = bio;
    if (skills) updateData['profile.skills'] = skills.split(',');

    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path);
      updateData['profile.media'] = uploadResponse.secure_url;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    })
  }
}

module.exports = {
  getProfile,
  updateProfile,
}
