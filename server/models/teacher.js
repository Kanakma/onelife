const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  university_code: String,
  faculty_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Faculty'},
  entry_year: Date,
  img: {
    type:String,
    default:'default.jpg'
  },
  degree: String,
  email: {
    type:String,
    default:'example@onelife.systems'
  },
  phone: {
    type:String,
    default:'+7-777-777-77-77'
  },
  social: Array
});
 

module.exports = mongoose.model('Teacher', TeacherSchema);
