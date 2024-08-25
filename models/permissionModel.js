const mongoose = require('mongoose')
const permissionSchema = new mongoose.Schema({
  permission_name:{
    type: String,
    required: true
  },

  is_default:{
    type: Number,
    default:0   //0 -> not default, 1 -> default
  }
})

module.exports = mongoose.model('Permission', permissionSchema)




// const mongoose = require('mongoose');

// const permissionSchema = new mongoose.Schema({
//   role: { type: String, required: true },
//   resource: { type: String, required: true },
//   create: { type: Boolean, default: false },
//   read: { type: Boolean, default: false },
//   update: { type: Boolean, default: false },
//   delete: { type: Boolean, default: false }
// });

// module.exports = mongoose.model('Permission', permissionSchema);


// const mongoose = require('mongoose');

// const PermissionSchema = new mongoose.Schema({
//   permission_name: {
//     type: String,
//     enum: ['admin', 'student', 'recruiter'],
//     required: true
//   },
//   resource: {
//     type: String,
//     enum: ['User', 'Project', 'Company'],
//     required: true
//   },
//   create: {
//     type: Boolean,
//     default: false
//   },
//   read: {
//     type: Boolean,
//     default: true
//   },
//   update: {
//     type: Boolean,
//     default: false
//   },
//   delete: {
//     type: Boolean,
//     default: false
//   }
// });

// module.exports = mongoose.model('Permission', PermissionSchema);
