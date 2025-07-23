require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.SERVER_PORT || 5000;
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoute');
const { swaggerUi, swaggerSpec } = require('./swagger');
const recruiterRoutes = require('./routes/recruiterRoute');
const studentRoutes = require('./routes/studentRoute');
const app = express();

// Middleware
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/student', studentRoutes);
  

// Database connection
const mongoURI = process.env.MONGODB_CONNECTION;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Database Connected Successfully🥳🥳🥳🥳🥳🥳');
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT} 🔒🔒🔒🔒🔒🔒🔒`);
    });
  })
  .catch((err) => {
    console.log('There was an error connecting to the database, 😮😮😮😮😮😮', err);
  });
