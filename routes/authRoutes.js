const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')
const authController = require ('../controllers/authController')
const { registerValidator, loginValidator } = require('../helpers/validator')


// Registration and Login Routes
router.post('/register',registerValidator, authController.registerUser)
router.post('/login',loginValidator, authController.loginUser)
 
// get profile
router.get('/profile', auth,authController.getProfile)



module.exports = router