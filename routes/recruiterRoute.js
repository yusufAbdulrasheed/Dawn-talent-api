const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware')
const recruiterController = require('../controllers/recruiter/recruiterController')
const { upload } = require('../helpers/cloudinary')

// Recruiter routes
router.get('/profile', auth,recruiterController.getRecruiterProfile)
router.post('/create-profile', auth, recruiterController. createRecruiterProfile)
router.put('/profile', auth, upload.single('media'), recruiterController.updateRecruiterProfile);

module.exports = router;
