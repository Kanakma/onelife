const mongoose = require('mongoose');

const MarkSchema = new mongoose.Schema({
	student:  {type:mongoose.Schema.Types.ObjectId, ref:'Student'},
	teacher: {type:mongoose.Schema.Types.ObjectId, ref:'Teacher'},
	date: { type: Date, default: Date.now },
	stud_mark: String,
	subject_name: {type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
	group_id: {type:mongoose.Schema.Types.ObjectId, ref:'Group'},
	mark_type: String
})

module.exports = mongoose.model('Mark', MarkSchema);
