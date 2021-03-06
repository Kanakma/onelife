const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subject_code: String,
  subject_name: String,
  faculty_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Faculty'},
  teacher_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
  period: Number,
  course_number: Number,
  credit_number: Number,
  max_students: Number,
  students:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
  groups:[{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
  description: String,
  img: {
    type:String,
    default:'default.jpg'
  },
  optional: {
    type:Boolean,
    default:true
  }
});
module.exports = mongoose.model('Subject', SubjectSchema);
