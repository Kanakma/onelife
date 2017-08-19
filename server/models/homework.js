const mongoose = require('mongoose');

const Homework = new mongoose.Schema({
  student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
  lessonDate: Date,
  checked: {
    type:Boolean,
    default:false
  },
  deadline: Date,
  subject_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
  teacher_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
  status: {
    type:Boolean,
    default:false
  },
  message: String,
  file: String
});


module.exports = mongoose.model('Homework', Homework);
