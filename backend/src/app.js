const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes')); // User routes
app.use('/api/points', require('./routes/pointsRoutes')); // Points routes

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
