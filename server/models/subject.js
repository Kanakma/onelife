const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subject_code: String,
  subject_name: String,
  major_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Major'},
  teacher_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
  period: Number,
  course_number: Number,
  credit_number: Number,
  max_students: Number,
  students: Array,
  description: String,
  img: String
});


module.exports = mongoose.model('Subject', SubjectSchema);
