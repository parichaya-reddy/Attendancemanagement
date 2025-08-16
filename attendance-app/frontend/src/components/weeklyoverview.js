import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const WeeklyOverview = () => {
  const data = [
    { day: 'Mon', present: 42, absent: 4 },
    { day: 'Tue', present: 40, absent: 6 },
    { day: 'Wed', present: 38, absent: 8 },
    { day: 'Thu', present: 44, absent: 2 },
    { day: 'Fri', present: 45, absent: 1 },
    { day: 'Sat', present: 41, absent: 5 },
    { day: 'Sun', present: 39, absent: 7 }
  ];

  return (
    <div className="weekly-overview">
      <h3>Weekly Attendance Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="present" fill="#4CAF50" name="Present" />
          <Bar dataKey="absent" fill="#F44336" name="Absent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyOverview;
