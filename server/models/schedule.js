const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
	group_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
	period:Number,
	week:{
		monday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}
		}],
		tuesday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}
		}],
		wednesday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}
		}],
		thursday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}
		}],
		friday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}
		}],
		saturday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}
		}]
	}
});

module.exports = mongoose.model('Schedule', ScheduleSchema);