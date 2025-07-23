const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware')
const adminController = require('../controllers/admin/adminController');




/**
 * @swagger
 * /approve-request:
 *   post:
 *     summary: Approve a recruiter's request for a student
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recruiterId:
 *                 type: string
 *               studentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recruiter request for student approved
 *       400:
 *         description: Validation error or student not requested
 *       404:
 *         description: Recruiter or student not found
 */
router.post('/approve-request', auth, adminController.approveRecruiterStudentRequest);

/**
 * @swagger
 * /approve-recruiter-profile:
 *   post:
 *     summary: Approve a recruiter profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recruiterId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recruiter profile approved
 *       400:
 *         description: Recruiter ID required
 *       404:
 *         description: Recruiter not found
 */
router.post('/approve-recruiter-profile', auth, adminController.approveRecruiterProfile);

/**
 * @swagger
 * /view-recruiter:
 *   get:
 *     summary: View all recruiters
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of recruiters
 *       404:
 *         description: No recruiters found
 */
router.get('/view-recruiter', auth, adminController.getAllRecruiters);

/**
 * @swagger
 * /view-recruiter-profile/{id}:
 *   get:
 *     summary: View a particular recruiter profile by ID
 *     tags: [Admin]
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
router.get('/view-recruiter-profile/:id', auth, adminController.getRecruiter);

/**
 * @swagger
 * /disable-recruiter:
 *   delete:
 *     summary: Disable a recruiter profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recruiterId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recruiter profile disabled
 *       400:
 *         description: Recruiter ID required
 *       404:
 *         description: Recruiter not found
 */
router.delete('/disable-recruiter', auth, adminController.disableRecruiterProfile);

/**
 * @swagger
 * /createstudents:
 *   post:
 *     summary: Create a new student
 *     tags: [Admin]
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
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Validation error
 */
router.post('/createstudents',auth, adminController.createStudent);

/**
 * @swagger
 * /getstudent/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Admin]
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
router.get('/getstudent/:id', auth, adminController.getStudent);

/**
 * @swagger
 * /getallstudents:
 *   get:
 *     summary: Get all students
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       404:
 *         description: No students found
 */
router.get('/getallstudents', auth, adminController.getAllStudents);

/**
 * @swagger
 * /deletestudent/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Admin]
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
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete('/deletestudent/:id', auth, adminController.deleteStudentById);

/**
 * @swagger
 * /deletestudents:
 *   delete:
 *     summary: Delete all students
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All students deleted successfully
 *       404:
 *         description: No students found
 */
router.delete('/deletestudents', auth, adminController.deleteAllStudents);

module.exports = router;