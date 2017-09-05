const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
	period:Number,
	week:{
		monday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
			group_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
		}],
		tuesday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
			group_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
		}],
		wednesday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
			group_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
		}],
		thursday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
			group_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
		}],
		friday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
			group_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
		}],
		saturday:[{
			time:String,
			subject_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
			group_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
		}]
	}
});

module.exports = mongoose.model('Schedule', ScheduleSchema);