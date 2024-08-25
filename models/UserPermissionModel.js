const mongoose = require('mongoose')
const userPermissionSchema = new mongoose.Schema({
  user_id:{
    type:mongoose.Schema.ObjectId,
    required: true,
    ref:'User'
  },

  permission:{
    permission_name: String,
    permission_value: [Number]
  }
})

module.exports = mongoose.model('UserPermission', userPermissionSchema )

// const mongoose = require('mongoose');

// const UserPermissionSchema = new mongoose.Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
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

// module.exports = mongoose.model('UserPermission', UserPermissionSchema);
