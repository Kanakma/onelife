const mongoose = require('mongoose');

const Homework = new mongoose.Schema({
  answer: [{
    student_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    checked:{
      type:Boolean,
      default:false
  },
    status: {
      type:Boolean,
      default:false
    },
    answer_file: String,
    answer_message:String
}],
  lessonDate: Date,
  deadline: Date,
  subject_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
  teacher_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
  group_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
  message: String,
  file: String,
});


module.exports = mongoose.model('Homework', Homework);
