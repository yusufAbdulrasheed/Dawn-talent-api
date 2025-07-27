const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student/studentController');
const auth = require('../middlewares/authMiddleware')



/**
 * @swagger
 * /student/profile:
 *   get:
 *     summary: Get the authenticated student's profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student profile data
 *       404:
 *         description: Profile not found
 */
router.get('/profile', auth, studentController.getProfile);

/**
 * @swagger
 * /student/view-recruiters:
 *   get:
 *     summary: Get all recruiters
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of recruiters
 *       404:
 *         description: No recruiters found
 */
router.get('/view-recruiters', auth, studentController.viewAllRecruiters);

/**
 * @swagger
 * /student/view-recruiter-profile/{id}:
 *   get:
 *     summary: Get a specific recruiter profile by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recruiter ID
 *     responses:
 *       200:
 *         description: Recruiter profile data
 *       404:
 *         description: Recruiter not found
 */
router.get('/view-recruiter-profile/:id', auth, studentController.viewRecruiterProfile);

/**
 * @swagger
 * /student/view-students:
 *   get:
 *     summary: Get all other students except the authenticated one
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       404:
 *         description: No other students found
 */
router.get('/view-students', auth, studentController.viewAllStudents);

/**
 * @swagger
 * /student/update-profile:
 *   put:
 *     summary: Update the authenticated student's profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               projects:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Student not found
 */
router.put('/update-profile', auth, studentController.updateProfile);

module.exports = router;
