const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware')
const recruiterController = require('../controllers/recruiter/recruiterController')


/**
 * @swagger
 * /create-profile:
 *   post:
 *     summary: Create or assign a company profile for the recruiter
 *     tags: [Recruiters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company profile created or assigned
 *       400:
 *         description: Company name and position are required
 */
router.post('/create-profile', auth, recruiterController.CreateCompany);

/**
 * @swagger
 * /request-student:
 *   post:
 *     summary: Request a student from the admin
 *     tags: [Recruiters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student request sent to admin
 *       400:
 *         description: Student ID is required or already requested
 *       404:
 *         description: Student not found
 */
router.post('/request-student', auth, recruiterController.requestStudent);

/**
 * @swagger
 * /edit-profile:
 *   put:
 *     summary: Update recruiter profile
 *     tags: [Recruiters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Recruiter not found
 */
router.put('/edit-profile', auth, recruiterController.updateRecruiterProfile);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get the authenticated recruiter's profile
 *     tags: [Recruiters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recruiter profile data
 *       404:
 *         description: Recruiter not found
 */
router.get('/profile', auth, recruiterController.getRecruiterProfile);

/**
 * @swagger
 * /all-students:
 *   get:
 *     summary: View all students
 *     tags: [Recruiters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       404:
 *         description: No students found
 */
router.get('/all-students', auth, recruiterController.viewAllStudents);

/**
 * @swagger
 * /view-studentProfile/{id}:
 *   get:
 *     summary: View a particular student profile by ID
 *     tags: [Recruiters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student profile data
 *       404:
 *         description: Student not found
 */
router.get('/view-studentProfile/:id', auth, recruiterController.viewStudentProfile);

module.exports = router;
