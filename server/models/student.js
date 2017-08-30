const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
  img: {
    type:String,
    default:'default.jpg'
  },
  university_code: String,
  faculty_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Faculty'},
  department_id:{ type:mongoose.Schema.Types.ObjectId, ref:'Department'},
  major_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Major'},
  group_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
  admission_year: Number,
  graduation_year: Number
});


module.exports = mongoose.model('Student', StudentSchema);
