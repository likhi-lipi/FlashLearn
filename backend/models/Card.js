const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    default: 0 // e.g., 0: New, 1: Easy, 2: Medium, 3: Hard
  },
  nextReviewDate: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Card', CardSchema);
