const { check } = require('express-validator')

// Add permission validator Validator
exports.permissionAddValidator = [
  check('permission_name', 'Permission name is required').not().isEmpty()
]
