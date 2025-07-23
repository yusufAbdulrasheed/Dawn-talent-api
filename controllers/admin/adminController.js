const Admin = require("../../models/userModel").Admin;
const Recruiter = require('../../models/userModel').Recruiter;
const Student = require('../../models/userModel').Student;
const Project = require('../../models/projectModel');
const bcrypt = require('bcryptjs')

const approveRecruiterStudentRequest = async (req, res) => {
  try {
    const { recruiterId, studentId } = req.body;
    const adminId = req.user._id; 

    if (!recruiterId || !studentId) {
      return res.status(400).json({ success: false, msg: 'Recruiter ID and Student ID are required.' });
    }

    const recruiter = await Recruiter.findById(recruiterId);
    const student = await Student.findById(studentId);
    if (!recruiter || !student) {
      return res.status(404).json({ success: false, msg: 'Recruiter or Student not found.' });
    }

    if (!recruiter.requests.some(id => id.toString() === studentId)) {
      return res.status(400).json({ success: false, msg: 'Student not requested by recruiter.' });
    }

    recruiter.requests = recruiter.requests.filter(id => id.toString() !== studentId);
    await recruiter.save();

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, msg: 'Admin not found.' });
    }
    if (!admin.managedStudents.includes(studentId)) {
      admin.managedStudents.push(studentId);
      await admin.save();
    }

    res.status(200).json({ success: true, msg: 'Recruiter request for student approved.' });
  } catch (error) {
    console.error('Error approving recruiter request:', error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

const approveRecruiterProfile = async (req, res) => {
  try {
    const { recruiterId } = req.body;
    const adminId = req.user._id; // assuming admin is authenticated

    if (!recruiterId) {
      return res.status(400).json({ success: false, msg: 'Recruiter ID is required.' });
    }

    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ success: false, msg: 'Recruiter not found.' });
    }

    recruiter.approved = true;
    await recruiter.save();

    res.status(200).json({ success: true, msg: 'Recruiter profile approved.' });
  } catch (error) {
    console.error('Error approving recruiter profile:', error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find({}).select('name email approved company');
    if (!recruiters || recruiters.length === 0) {
      return res.status(404).json({ success: false, msg: 'No recruiters found' });
    }
    res.status(200).json({ success: true, data: recruiters });
  } catch (error) {
    console.error('Error fetching recruiters:', error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getRecruiter = async (req, res) => {
  try {
    const recruiterId = req.params.id;
    const recruiter = await Recruiter.findById(recruiterId)
      .select('name email approved company requests');

    if (!recruiter) {
      return res.status(404).json({ success: false, msg: 'Recruiter not found' });
    }

    res.status(200).json({ success: true, data: recruiter });
  } catch (error) {
    console.error('Error fetching recruiter profile:', error);
    res.status(500).json({ success: false, msg: error.message });
  }
}

const disableRecruiterProfile = async (req, res) => {
  try {
    const { recruiterId } = req.body;
    const adminId = req.user._id; 

    if (!recruiterId) {
      return res.status(400).json({ success: false, msg: 'Recruiter ID is required.' });
    }

    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ success: false, msg: 'Recruiter not found.' });
    }

    recruiter.approved = false;
    await recruiter.save();

    res.status(200).json({ success: true, msg: 'Recruiter profile disabled.' });
  } catch (error) {
    console.error('Error disabling recruiter profile:', error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, email, password, profile } = req.body;

    if (!name || !email || !password || !profile) {
      return res.status(400).json({ success: false, msg: "Missing required fields" });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ success: false, msg: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const projectIds = [];
    if (profile.projects && profile.projects.length > 0) {
      for (const proj of profile.projects) {
        const savedProject = await Project.create(proj);
        projectIds.push(savedProject._id);
      }
    }

  
    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      profile: {
        bio: profile.bio || '',
        skills: profile.skills || [],
        projects: projectIds
      }
    });

    res.status(201).json({ success: true, data: student });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

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

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}).populate('profile.projects');
    
    if (!students || students.length === 0) {
      return res.status(404).json({ success: false, msg: 'No students found' });
    }

    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, msg: 'Student not found' });
    }

    const projectIds = student.profile?.projects || [];

    if (projectIds.length > 0) {
      await Project.deleteMany({ _id: { $in: projectIds } });
    }

    await Student.findByIdAndDelete(studentId);

    return res.status(200).json({
      success: true,
      msg: 'Student and associated project(s) deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting student and projects:', error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find({});

    if (allStudents.length === 0) {
      return res.status(404).json({ success: false, msg: 'No students found' });
    }

    const allProjectIds = allStudents.flatMap(student => student.profile?.projects || []);

    if (allProjectIds.length > 0) {
      await Project.deleteMany({ _id: { $in: allProjectIds } });
    }

    await Student.deleteMany({});

    res.status(200).json({
      success: true,
      msg: 'All students and their associated projects have been deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting all students and projects:', error);
    res.status(500).json({ success: false, msg: error.message });
  }
};
module.exports ={
  approveRecruiterStudentRequest,
  approveRecruiterProfile,
  getAllRecruiters,
  getRecruiter,
  disableRecruiterProfile, 
  createStudent,
  getStudent,
  getAllStudents,
  deleteStudentById,
  deleteAllStudents 
}
