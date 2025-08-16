const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  hour: { type: Number, required: true },
  students: [
    {
      name: String,
      rollNo: String,
      status: { type: String, enum: ['present', 'absent'] },
    },
  ],
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
