const Student = require('../../models/userModel').Student;
const Recruiter = require('../../models/userModel').Recruiter;

const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).populate('profile.projects');
    if (!student) {
      return res.status(404).json({ success: false, msg: 'Profile not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { bio, skills, projects } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, msg: 'Student not found' });
    }

    if (bio !== undefined) student.profile.bio = bio;
    if (skills !== undefined) student.profile.skills = skills;
    if (projects !== undefined) student.profile.projects = projects;

    await student.save();

    res.status(200).json({ success: true, msg: 'Profile updated successfully', data: student });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const viewAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find({}).select('name email approved company');
    if (!recruiters || recruiters.length === 0) {
      return res.status(404).json({ success: false, msg: 'No recruiters found' });
    }
    res.status(200).json({ success: true, data: recruiters });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const viewRecruiterProfile = async (req, res) => {
  try {
    const recruiterId = req.params.id;
    const recruiter = await Recruiter.findById(recruiterId)
      .select('name email approved company');

    if (!recruiter) {
      return res.status(404).json({ success: false, msg: 'Recruiter not found' });
    }

    res.status(200).json({ success: true, data: recruiter });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const viewAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ _id: { $ne: req.user._id } })
      .select('name email profile');
    if (!students || students.length === 0) {
      return res.status(404).json({ success: false, msg: 'No other students found' });
    }
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
module.exports = {
  getProfile,
  updateProfile,
  viewAllRecruiters,
  viewRecruiterProfile,
  viewAllStudents
}