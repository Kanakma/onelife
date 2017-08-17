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
 //students: Array,
  students:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}], 
 // students : {student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }},
 // students: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
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
