const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  university_code: String,
  faculty_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Faculty'},
  department_id:{ type:mongoose.Schema.Types.ObjectId, ref:'Department'},
  major_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Major'},
  admission_year: Number,
  graduation_year: Number
});


module.exports = mongoose.model('Student', StudentSchema);
