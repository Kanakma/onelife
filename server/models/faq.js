const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
	date: { type: Date, default: Date.now },
  question: String,
  file: String,
  answer: String,
  answer_file: String
})

module.exports = mongoose.model('Faq', FaqSchema);
