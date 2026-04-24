const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  roll: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  project: {
    type: String,
    trim: true
  },
  hobbies: {
    type: String,
    trim: true
  },
  certificate: {
    type: String,
    trim: true
  },
  internship: {
    type: String,
    trim: true
  },
  aboutAim: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
