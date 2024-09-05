const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student/studentController');
const { upload } = require('../helpers/cloudinary');

// Student routes
router.get('/profile', studentController.getProfile);
router.put('/profile', upload.single('media'), studentController.updateProfile);

module.exports = router;
