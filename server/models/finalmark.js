const mongoose = require('mongoose');

const FinalMarkSchema = new mongoose.Schema({
	student:  {type:mongoose.Schema.Types.ObjectId, ref:'Student'},
	teacher: {type:mongoose.Schema.Types.ObjectId, ref:'Teacher'},
	date: {type: Date, default: Date.now },
	subject_name: {type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
	group_id: {type:mongoose.Schema.Types.ObjectId, ref:'Group'},
	mark_type: String,
	final_mark: {
		rk1: Number,
		rk2: Number,
		final_m: Number
	},
	stud_final_mark: { 
stud_final:Number
	},
	current_gpa:{
		stud_gpa:Number
	}
})

module.exports = mongoose.model('FinalMark', FinalMarkSchema);
