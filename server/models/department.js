const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  department_code: String,
  department_name: String,
  department_director: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
  department_email: String,
  department_phone: String,
  majors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Major'}],
  department_faculty:{type: mongoose.Schema.Types.ObjectId, ref: 'Faculty'}
});


module.exports = mongoose.model('Department', DepartmentSchema);
