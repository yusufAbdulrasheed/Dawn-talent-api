const Student = require('../../models/userModel').Student;
const { validationResult } = require('express-validator');
const cloudinary = require('../../helpers/cloudinary');

// Get Student Profile
const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate('profile.projects');
    if (!student) {
      return res.status(404).json({ success: false, msg: 'Profile not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Update Student Profile
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const updateData = req.body;

    // If media is being updated
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.media.path);
      updateData['profile.media'] = uploadResult.secure_url;
    }

    const student = await Student.findByIdAndUpdate(req.user.id, updateData, { new: true });
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
}
module.exports = {
  getProfile,
  updateProfile
}