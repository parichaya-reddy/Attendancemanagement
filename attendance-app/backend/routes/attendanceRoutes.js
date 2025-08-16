const express = require('express');
const router = express.Router();
const { postAttendance, getAttendanceStats } = require('../controllers/attendanceController');

// POST: Create or update attendance
router.post('/', postAttendance);

// GET: Fetch attendance statistics (presentees/absentees)
router.get('/stats/:date/:hour', getAttendanceStats);

module.exports = router;
