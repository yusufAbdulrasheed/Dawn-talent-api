const Admin = require("../../models/userModel").Admin;
const Recruiter = require('../../models/userModel').Recruiter;
const Student = require('../../models/userModel').Student;
const cloudinary = require('../../helpers/cloudinary');

// Get Recruiter Profile
const getRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id).populate('company.companyId');
    if (!recruiter) {
      return res.status(404).json({ success: false, msg: 'Recruiter not found' });
    }
    res.status(200).json({ success: true, data: recruiter });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Update Recruiter Profile
const updateRecruiter = async (req, res) => {
  try {
    const updateData = req.body;

    // If media is being updated
    if (req.files) {
      const uploadResult = await cloudinary.uploader.upload(req.files.media.path);
      updateData.media = uploadResult.secure_url;
    }

    const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ success: true, data: recruiter });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Delete Recruiter Profile
const deleteRecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndDelete(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ success: false, msg: 'Recruiter not found' });
    }
    res.status(200).json({ success: true, msg: 'Recruiter deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Create Student Profile
const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Student Profile
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('profile.projects');
    if (!student) {
      return res.status(404).json({ success: false, msg: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Update Student Profile
const updateStudent = async (req, res) => {
  try {
    const updateData = req.body;

    // If media is being updated
    if (req.files) {
      const uploadResult = await cloudinary.uploader.upload(req.files.media.path);
      updateData['profile.media'] = uploadResult.secure_url;
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Delete Student Profile
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}

module.exports ={
  getRecruiter,
  updateRecruiter,
  deleteRecruiter,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent
}
