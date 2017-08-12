const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },

  major_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Major'},
  lesson_date: Number,
  status: String
});


module.exports = mongoose.model('Attendance', AttendanceSchema);
