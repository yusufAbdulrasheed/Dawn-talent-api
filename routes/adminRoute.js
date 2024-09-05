const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware')
const adminController = require('../controllers/admin/adminController');
const permissionController = require('../controllers/admin/permissionController');
const { permissionAddValidator } = require('../helpers/adminValidator');



// Admin routes
router.post('/permissions', auth, permissionAddValidator, permissionController.addPermission);
router.get('/recruiters', auth, adminController.getRecruiter);
router.get('/students', auth, adminController.getStudent);
router.put('/recruiters/:id', auth, adminController.updateRecruiter);
router.put('/students/:id', auth, adminController.updateStudent);
router.delete('/recruiters/:id', auth, adminController.deleteRecruiter);
router.delete('/students/:id', auth, adminController.deleteStudent);

module.exports = router;
