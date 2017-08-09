const mongoose = require('mongoose');

const QuizPointSchema = new mongoose.Schema({
  quiz_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'},
  student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
  q_number: Number,
  wrong_answers: Number,
  points: Number
});


module.exports = mongoose.model('QuizPoint', QuizPointSchema);