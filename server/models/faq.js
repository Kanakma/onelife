const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
  question: String,
  file: String,
  answer: String
})

module.exports = mongoose.model('Faq', FaqSchema);
