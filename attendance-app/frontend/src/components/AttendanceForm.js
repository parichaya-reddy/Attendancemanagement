import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/app.css'; // Ensure the path is correct
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const AttendanceForm = () => {
  const [students, setStudents] = useState([]);
  const [selectedHour, setSelectedHour] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const studentList = [
        { name: "John Doe", rollNo: "101", status: "absent" },
        { name: "Jane Smith", rollNo: "102", status: "absent" },
        { name: "Alice Johnson", rollNo: "103", status: "absent" },
        { name: "Bob Brown", rollNo: "104", status: "absent" },
        { name: "Charlie Davis", rollNo: "105", status: "absent" },
        { name: "David Evans", rollNo: "106", status: "absent" },
        { name: "Eva Green", rollNo: "107", status: "absent" },
        { name: "Frank Harris", rollNo: "108", status: "absent" },
        { name: "Grace Lee", rollNo: "109", status: "absent" },
        { name: "Hannah Moore", rollNo: "110", status: "absent" },
        { name: "Isaac Nelson", rollNo: "111", status: "absent" },
        { name: "Jack Oliver", rollNo: "112", status: "absent" },
        { name: "Katie Parker", rollNo: "113", status: "absent" },
        { name: "Liam Quinn", rollNo: "114", status: "absent" },
        { name: "Mia Roberts", rollNo: "115", status: "absent" },
        { name: "Noah Scott", rollNo: "116", status: "absent" },
        { name: "Olivia Taylor", rollNo: "117", status: "absent" },
        { name: "Paul Underwood", rollNo: "118", status: "absent" },
        { name: "Quinn Vance", rollNo: "119", status: "absent" },
        { name: "Riley Walker", rollNo: "120", status: "absent" },
        { name: "Sophia Xander", rollNo: "121", status: "absent" },
        { name: "Toby Young", rollNo: "122", status: "absent" },
        { name: "Uma Zane", rollNo: "123", status: "absent" },
        { name: "Victor Allen", rollNo: "124", status: "absent" },
        { name: "Wendy Brown", rollNo: "125", status: "absent" },
        { name: "Xander Clark", rollNo: "126", status: "absent" },
        { name: "Yara Davis", rollNo: "127", status: "absent" },
        { name: "Zoe Edwards", rollNo: "128", status: "absent" },
        { name: "Adam Foster", rollNo: "129", status: "absent" },
        { name: "Bella Grant", rollNo: "130", status: "absent" },
        { name: "Chris Hill", rollNo: "131", status: "absent" },
        { name: "Diana Irwin", rollNo: "132", status: "absent" },
        { name: "Ethan Jackson", rollNo: "133", status: "absent" },
        { name: "Fiona King", rollNo: "134", status: "absent" },
        { name: "Garry Lewis", rollNo: "135", status: "absent" },
        { name: "Holly Moore", rollNo: "136", status: "absent" },
        { name: "Ian Norris", rollNo: "137", status: "absent" },
        { name: "Julia Peterson", rollNo: "138", status: "absent" },
        { name: "Kevin Quinn", rollNo: "139", status: "absent" },
        { name: "Lily Ross", rollNo: "140", status: "absent" },
        { name: "Mike Stevens", rollNo: "141", status: "absent" },
        { name: "Nina Taylor", rollNo: "142", status: "absent" },
        { name: "Oscar Walker", rollNo: "143", status: "absent" },
        { name: "Pamela Xander", rollNo: "144", status: "absent" },
        { name: "Quincy Young", rollNo: "145", status: "absent" },
        { name: "Ruby Zimmerman", rollNo: "146", status: "absent" }
    ];
    setStudents(studentList);
  }, []);

  const handleStatusChange = (index, status) => {
    const updated = [...students];
    updated[index].status = status;
    setStudents(updated);
  };

  const handleSubmit = async () => {
    const attendanceData = { date, hour: selectedHour, students };

    try {
      await axios.post('http://localhost:5000/attendance', attendanceData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting attendance:', error.response ? error.response.data : error.message);
      alert(`Error submitting attendance: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  const presentCount = students.filter(s => s.status === "present").length;
  const absentCount = students.length - presentCount;
  const absentList = students.filter(s => s.status === "absent");

  const chartData = [
    { name: "Present", count: presentCount },
    { name: "Absent", count: absentCount }
  ];

  return (
    <div className="container">
      <h2>Mark Attendance</h2>
      <div className="form-container">
        <div className="date-hour-container">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <select value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
            {[...Array(8).keys()].map(hour => (
              <option key={hour} value={hour + 1}>Hour {hour + 1}</option>
            ))}
          </select>
        </div>

        <div className="student-list">
          {students.map((student, index) => (
            <div className="student-item" key={index}>
              <span>{student.name} ({student.rollNo})</span>
              <label>
                <input
                  type="checkbox"
                  className="attendance-checkbox"
                  checked={student.status === "present"}
                  onChange={(e) =>
                    handleStatusChange(index, e.target.checked ? "present" : "absent")
                  }
                />
                Present
              </label>
            </div>
          ))}
        </div>

        <button onClick={handleSubmit}>Submit Attendance</button>
        {isSubmitted && <p className="submit-message">Attendance Submitted!</p>}
      </div>

      {/* Bar Graph */}
      <h3>Attendance Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>

      {/* Absent List */}
      <h3>Absent Students</h3>
      {absentList.length > 0 ? (
        <ul>
          {absentList.map((s, i) => (
            <li key={i}>{s.name} ({s.rollNo})</li>
          ))}
        </ul>
      ) : (
        <p>All students are present.</p>
      )}
    </div>
  );
};

export default AttendanceForm;



