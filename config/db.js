const mongoose = require('mongoose');

// Replace with your actual MongoDB URI
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://admin:shivangi%402002@cluster0.upude.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    // Connecting to the MongoDB Atlas database
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Atlas!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure if DB connection fails
  }
};

module.exports = connectDB;
