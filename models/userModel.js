const mongoose = require('mongoose')
const Project = require('./projectModel')
const Company = require('./companyModel')

const userSchema = new mongoose.Schema({

  name:{
    type: String,
    required: true
  },

  email:{
    type: String,
    required: true
  },

  password:{
    type: String,
    required: true
  },

  role:{
    // type: Number,
    // default: 0 //0 -> Recruiter, 1 -> Admin, 2 -> Student
      type: String,
      enum: ['admin', 'student', 'recruiter'],
      default: 'recruiter',
  }

}, { discriminatorKey: 'role' })

const adminSchema = new mongoose.Schema({
  managedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  managedRecruiters:[{
    type:mongoose.Schema.Types.ObjectId, 
    ref: 'Recruiter'
  }]
})

const studentSchema = new mongoose.Schema({
  profile:{
    bio: String,
    skills:[String],
    projects:[{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }]
  }
})

const recruiterSchema = new mongoose.Schema({
  approved: {
    type: Boolean,
    default: false
  },
  requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  company: {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    position: {
      type: String,
      required: true
    }
  }
})


const User = mongoose.model('User', userSchema)
const Admin = User.discriminator('Admin', adminSchema)
const Student = User.discriminator('Student', studentSchema)
const Recruiter = User.discriminator('Recruiter', recruiterSchema)

module.exports = {
  User,
  Admin,
  Student,
  Recruiter
}