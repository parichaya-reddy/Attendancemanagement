import React, { useState } from 'react';
import AttendanceForm from './components/AttendanceForm';
import AttendanceStats from './components/AttendanceStats';
import './styles/app.css';

function App() {
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');

  return (
    <div className="container">
      <h2>Attendance Management</h2>
      <AttendanceForm />
      <div className="input-group">
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Hour: </label>
        <input
          type="number"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
      </div>
      <AttendanceStats date={date} hour={hour} />
    </div>
  );
}

export default App;

