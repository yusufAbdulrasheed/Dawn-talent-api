const mongoose = require('mongoose');
const permissionSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['admin', 'student', 'recruiter'],
    required: true
  },
  resource: {
    type: String,
    enum: ['User', 'Project', 'Company'],
    required: true
  },
  create: {
    type: Boolean,
    default: false
  },
  read: {
    type: Boolean,
    default: true
  },
  update: {
    type: Boolean,
    default: false
  },
  delete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Permission', permissionSchema);
