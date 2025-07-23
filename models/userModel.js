const mongoose = require('mongoose')
// const Project = require('./projectModel')
// const Company = require('./companyModel')

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
      type: String,
      enum: ['admin', 'student', 'recruiter'],
      default: 'recruiter',
  }

}, { discriminatorKey: 'role' })

const adminSchema = new mongoose.Schema({
  managedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  managedRecruiters:[{
    type:mongoose.Schema.Types.ObjectId, 
    ref: 'User'
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
    ref: 'User'
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
const Admin = User.discriminator('admin', adminSchema)
const Student = User.discriminator('student', studentSchema)
const Recruiter = User.discriminator('recruiter', recruiterSchema)

module.exports = {
  User,
  Admin,
  Student,
  Recruiter
}