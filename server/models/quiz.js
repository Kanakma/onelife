const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  quiz_name: String,
  subject_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
  teacher_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
  q_number: Number,
  status: String
});


module.exports = mongoose.model('Quiz', QuizSchema);
