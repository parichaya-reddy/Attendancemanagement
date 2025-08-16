const Attendance = require('../models/Attendance');

// POST: Create or update attendance
const postAttendance = async (req, res) => {
  const { date, hour, students } = req.body;

  if (!date || !hour || !students) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let attendance = await Attendance.findOne({ date, hour });

    if (attendance) {
      // Update existing attendance record
      attendance.students = students;
      await attendance.save();
    } else {
      // Create new attendance record
      attendance = new Attendance({ date, hour, students });
      await attendance.save();
    }

    res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error('Error handling attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET: Fetch attendance statistics (presentees/absentees)
const getAttendanceStats = async (req, res) => {
  const { date, hour } = req.params;

  try {
    const attendance = await Attendance.findOne({ date, hour });

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    const presentees = attendance.students.filter(
      (student) => student.status === 'present'
    ).length;
    const absentees = attendance.students.filter(
      (student) => student.status === 'absent'
    ).length;

    res.status(200).json({ presentees, absentees });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { postAttendance, getAttendanceStats };
