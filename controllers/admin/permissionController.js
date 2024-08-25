const { validationResult } = require('express-validator')
const Permission = require('../../models/permissionModel')

const addPermission = async(req, res) =>{
  try{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return res.status( 401).json({
        success:false,
        msg: 'Errors',
        errors: errors.array()
      })
    }

    const { permission_name } = req.body

    const isExists = await Permission.findOne({ permission_name })

    if(isExists){
      return res.status(400).json({
        success: false,
        msg: 'Permission Name already exists'
      })
    }

    let obj = {
      permission_name
    }

    if(req.body.default){
      obj.is_default = parseInt(req.body.default)
    }

    const permission = new Permission(obj)
    const newPermission = await permission.save()
    return res.status(200).json({
      success: true,
      msg: 'Permission added successfully',
      data: newPermission
    })
  }
  catch(error){
    return res.status(400).json({
      success: false,
      msg: error.message
    })

  }
}

module.exports = {
  addPermission
}













// const Permission = require('../../models/permissionModel');

// // Create a new permission
// exports.createPermission = async (req, res) => {
//   try {
//     const { role, resource, create, read, update, delete: del } = req.body;

//     const newPermission = new Permission({ role, resource, create, read, update, delete: del });
//     await newPermission.save();

//     res.status(201).json({ message: 'Permission created successfully', permission: newPermission });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating permission', error: error.message });
//   }
// };

// // Update an existing permission
// exports.updatePermission = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const permission = await Permission.findByIdAndUpdate(id, updates, { new: true });

//     if (!permission) {
//       return res.status(404).json({ message: 'Permission not found' });
//     }

//     res.status(200).json({ message: 'Permission updated successfully', permission });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating permission', error: error.message });
//   }
// };

// // Delete a permission
// exports.deletePermission = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const permission = await Permission.findByIdAndDelete(id);

//     if (!permission) {
//       return res.status(404).json({ message: 'Permission not found' });
//     }

//     res.status(200).json({ message: 'Permission deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting permission', error: error.message });
//   }
// };

// // Get all permissions
// exports.getAllPermissions = async (req, res) => {
//   try {
//     const permissions = await Permission.find();
//     res.status(200).json(permissions);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving permissions', error: error.message });
//   }
// };
