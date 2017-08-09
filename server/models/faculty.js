const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  faculty_code: String,
  faculty_name: String,
  departments: Array,
  faculty_dean: String,
  faculty_email: String,
  faculty_phone: String
});


module.exports = mongoose.model('Faculty', FacultySchema);
