const Recruiter = require('../../models/userModel').Recruiter;
const { validationResult } = require('express-validator');
const cloudinary = require('../../helpers/cloudinary');

// Get Recruiter Profile
const getRecruiterProfile = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user.id).populate('company.companyId');
    if (!recruiter) {
      return res.status(404).json({ success: false, msg: 'Profile not found' });
    }
    res.status(200).json({ success: true, data: recruiter });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Update Recruiter Profile
const updateRecruiterProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const updateData = req.body;

    // If media is being updated
    if (req.files) {
      const uploadResult = await cloudinary.uploader.upload(req.files.media.path);
      updateData.media = uploadResult.secure_url;
    }

    const recruiter = await Recruiter.findByIdAndUpdate(req.user.id, updateData, { new: true });
    res.status(200).json({ success: true, data: recruiter });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
module.exports ={
  getRecruiterProfile,
  updateRecruiterProfile
}