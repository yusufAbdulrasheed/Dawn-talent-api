const mongoose = require('mongoose');

const UserPermissionSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

module.exports = mongoose.model('UserPermission', UserPermissionSchema);
