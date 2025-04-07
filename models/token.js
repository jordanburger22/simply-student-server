// models/Token.js
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    index: true // Improves lookup performance
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Ensure token uniqueness with a pre-save hook (optional safety)
tokenSchema.pre('save', function(next) {
  this.token = this.token || require('crypto').randomBytes(32).toString('hex');
  next();
});

module.exports = mongoose.model('Token', tokenSchema);