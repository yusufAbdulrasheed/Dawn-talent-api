const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  keyFeatures: {
    type: [String],
    required: true
  },
  technologiesUsed: {
    type: [String],
    required: true
  },
  role: {
    type: String,
    required: true
  },
  developmentPeriod: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  projectLink: {
    type: String,
    required: true
  },
  media: {
    type: [String],
    required: false
  },
  documentation: {
    userManual: {
      type: String,
      required: false
    },
    technicalDocumentation: {
      type: String,
      required: false
    },
    apiDocumentation: {
      type: String,
      required: false
    }
  }
})

module.exports = mongoose.model('Project', projectSchema)