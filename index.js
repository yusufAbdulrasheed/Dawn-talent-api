require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.SERVER_PORT || 5000
const express = require('express')
const authRoutes = require('./routes/authRoutes')
const app = express()

// Middleware
app.use(express.json())
app.use('/api', authRoutes)


// Database connection
const mongoURI = process.env.MONGODB_CONNECTION

mongoose.connect(mongoURI)
.then(()=>{
  console.log('Database Connected Successfully🥳🥳🥳🥳🥳🥳')
  app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT} 🔒🔒🔒🔒🔒🔒🔒`)
  })
})
.catch((err) => {
  console.log('There was an error connecting to the database, 😮😮😮😮😮😮', err)
})