const Recruiter = require('../../models/userModel').Recruiter;
const Company = require('../../models/companyModel');
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

// Create Recruiter Profile and Add Company Details
const createRecruiterProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, position, companyName } = req.body;

    // Handle media upload if file is present
    let media = null;
    if (req.files && req.files.media) {
      const uploadResult = await cloudinary.uploader.upload(req.files.media.path);
      media = uploadResult.secure_url;
    }

    // Check if company already exists
    let company = await Company.findOne({ name: companyName });
    if (!company) {
      // Create a new company if it doesn't exist
      company = new Company({ name: companyName });
      await company.save();
    }

    // Create recruiter profile
    const recruiter = new Recruiter({
      name,
      position,
      media,
      company: { companyId: company._id, position }
    });
    await recruiter.save();

    // Add recruiter to the company's recruiters list
    company.recruiters.push({ recruiterId: recruiter._id, position });
    await company.save();

    res.status(201).json({ success: true, data: recruiter });
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

module.exports = {
  getRecruiterProfile,
  createRecruiterProfile,
  updateRecruiterProfile
};



// const Recruiter = require('../../models/userModel').Recruiter;
// const { validationResult } = require('express-validator');
// const cloudinary = require('../../helpers/cloudinary');

// // Get Recruiter Profile
// const getRecruiterProfile = async (req, res) => {
//   try {
//     const recruiter = await Recruiter.findById(req.user.id).populate('company.companyId');
//     if (!recruiter) {
//       return res.status(404).json({ success: false, msg: 'Profile not found' });
//     }
//     res.status(200).json({ success: true, data: recruiter });
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

// // Update Recruiter Profile
// const updateRecruiterProfile = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success: false, errors: errors.array() });
//     }

//     const updateData = req.body;

//     // If media is being updated
//     if (req.files) {
//       const uploadResult = await cloudinary.uploader.upload(req.files.media.path);
//       updateData.media = uploadResult.secure_url;
//     }

//     const recruiter = await Recruiter.findByIdAndUpdate(req.user.id, updateData, { new: true });
//     res.status(200).json({ success: true, data: recruiter });
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };
// module.exports ={
//   getRecruiterProfile,
//   updateRecruiterProfile
// }