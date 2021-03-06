const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
	student:[{type:mongoose.Schema.Types.ObjectId, ref:'Student'}],
	teacher:[{type:mongoose.Schema.Types.ObjectId, ref:'Teacher'}],
	forAll:{type: Boolean, default:false},
	type:String,
	date:Date,
	text:String,
	from:String,
	readed:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
	creationDate:{
		type:Date,
		default:Date.now
	}
});


module.exports = mongoose.model('Notifications', NotificationSchema);