import React, { useState } from 'react';
import axios from 'axios';

const AttendanceStats = ({ date, hour }) => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/attendance/stats/${date}/${hour}`
      );
      setStats(res.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      alert('Error fetching stats');
    }
  };

  return (
    <div>
      <button onClick={fetchStats}>Get Stats</button>
      {stats && (
        <div className="stats">
          <p>Presentees: {stats.presentees}</p>
          <p>Absentees: {stats.absentees}</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceStats;
