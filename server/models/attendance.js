const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
	student:  {type:mongoose.Schema.Types.ObjectId, ref:'Student'}, 
	date: { type: Date, default: Date.now },
	stud_attendance: String,
	subject_id: {type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
	group_id: {type:mongoose.Schema.Types.ObjectId, ref:'Group'}
})

module.exports = mongoose.model('Attendance', AttendanceSchema);
