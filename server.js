
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // This should handle the DB connection
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Connect to DB using the connectDB function
connectDB(); // No need to manually call mongoose.connect() here

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
