const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Use the routes
app.use('/attendance', attendanceRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

