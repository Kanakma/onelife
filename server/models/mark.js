const mongoose = require('mongoose');

const MarkSchema = new mongoose.Schema({
	student:  {type:mongoose.Schema.Types.ObjectId, ref:'Student'}, 
	date: { type: Date, default: Date.now },
	stud_mark: String,
	stude_comment: String,
	subject_name: {type:mongoose.Schema.Types.ObjectId, ref:'Subject'}
})

module.exports = mongoose.model('Mark', MarkSchema);
