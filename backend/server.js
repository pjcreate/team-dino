const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const memberRoutes = require('./routes/members');
app.use('/api/members', memberRoutes);
// Also support /members for backward compatibility
app.use('/members', memberRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🦕 Team Dino API is running!',
    endpoints: {
      getAllMembers: 'GET /api/members',
      getMemberById: 'GET /api/members/:id',
      addMember: 'POST /api/members',
      deleteMember: 'DELETE /api/members/:id'
    }
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🦕 Team Dino server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
