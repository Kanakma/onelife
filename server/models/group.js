const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  group_name: String,
  curator: { type:mongoose.Schema.Types.ObjectId, ref:'Teacher'},
  students:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
  major: { type:mongoose.Schema.Types.ObjectId, ref:'Major'},
  course_number: Number
});


module.exports = mongoose.model('Group', GroupSchema);
