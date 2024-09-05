const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const { upload } = require('../helpers/cloudinary')

// Profile routes
router.get('/profile',  profileController.getProfile);
router.put('/profileUpdate', upload.single('media'), profileController.updateProfile);

module.exports = router;
