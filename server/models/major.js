const mongoose = require('mongoose');

const MajorSchema = new mongoose.Schema({
  major_name: String,
  major_code: {type: String, unique: true},
  major_group: String,
  major_department:{ type:mongoose.Schema.Types.ObjectId, ref:'Department'},
  groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]
});


module.exports = mongoose.model('Major', MajorSchema);
