const { Recruiter } = require('../../models/userModel');
const { Student } = require('../../models/userModel');
const Company = require('../../models/companyModel');
const mongoose = require('mongoose');

const CreateCompany = async (req, res) => {
  try {
    const recruiterId = req.user._id; 
    const { companyName, position } = req.body;

    if (!companyName || !position) {
      return res.status(400).json({ message: 'Company name and position are required.' });
    }

    const recruiter = await Recruiter.findById(recruiterId);
    if (recruiter.company && recruiter.company.companyId) {
      return res.status(400).json({ message: 'You have already been assigned to a company.' });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
  
      const alreadyExists = company.recruiters.some(r => r.recruiterId.toString() === recruiterId.toString());

      if (!alreadyExists) {
        company.recruiters.push({ recruiterId, position });
        await company.save();
      }

    } else {
      
      company = new Company({
        name: companyName,
        recruiters: [{ recruiterId, position }]
      });
      await company.save();
    }

    recruiter.company = {
      companyId: company._id,
      position
    };
    await recruiter.save();

    res.status(201).json({
      message: 'Company successfully assigned to recruiter.',
      company,
      recruiter
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

const getRecruiterProfile = async (req, res) => {
  try {
    const recruiterId = req.user._id; 
  
    const recruiter = await Recruiter.findById(recruiterId)
      .populate({
        path: 'company.companyId',
        select: 'name'
      })
      .populate({
        path: 'requests',
        select: 'name email profile',
        populate: {
          path: 'profile.projects',
          model: 'Project',
        }
      });

    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        recruiterProfile: {
          _id: recruiter._id,
          name: recruiter.name,
          email: recruiter.email,
          approved: recruiter.approved,
          company: recruiter.company,
        },
        requestedStudents: recruiter.requests,
      }
    });

  } catch (error) {
    console.error('Error fetching recruiter profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const viewAllStudents = async (req, res) => {
  try {
    const students = await Student.find({})
      .select('name email profile');

    res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const viewStudentProfile = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId)
      .select('name email profile');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateRecruiterProfile = async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const { name, email, position } = req.body;

    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    if (name) recruiter.name = name;
    if (email) recruiter.email = email;
    if (position && recruiter.company) recruiter.company.position = position;

    await recruiter.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: recruiter
    });
  } catch (error) {
    console.error('Error updating recruiter profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const requestStudent = async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const { studentId } = req.body;

    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Valid Student ID is required.' });
    }

    const student = await Student.findById(studentId).select('_id');
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const recruiter = await Recruiter.findById(recruiterId).select('requests');
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found.' });
    }

    if (recruiter.requests.some(id => id.toString() === studentId)) {
      return res.status(400).json({ message: 'You have already requested this student.' });
    }

    recruiter.requests.push(studentId);
    await recruiter.save();

    res.status(200).json({
      success: true,
      message: 'Student request sent to admin.',
      requestedStudent: studentId
    });
  } catch (error) {
    console.error('Error requesting student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  CreateCompany,
  getRecruiterProfile,
  viewAllStudents,
  viewStudentProfile,
  updateRecruiterProfile,
  requestStudent
};
