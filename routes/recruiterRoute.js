const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiter/recruiterController')
const { upload } = require('../helpers/cloudinary')

// Recruiter routes
router.get('/profile', recruiterController.getRecruiterProfile);
router.put('/profile', upload.single('media'), recruiterController.updateRecruiterProfile);

module.exports = router;
