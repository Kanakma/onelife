const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  lastname:String,
  name:String,
  gender:String,
  address_de_jure:{
    type:String,
    default:'Республика Казахстан, город Алматы, 050022, улица Фурманова, дом 58, этаж 10.'
  },
  address_de_facto:{
    type:String,
    default:'Республика Казахстан, город Алматы, 050022, улица Фурманова, дом 58, этаж 10.'
  },
  phone: {
    type:String,
    default:'+7-777-777-77-77'
  },
  email: {
    type:String,
    default:'example@onelife.systems'
  },
  passport_id:Number,
  id_number:Number,
  gave_by:String,
  employee_type:String,
  employement_type:String,
  date_of_id:Date,
  birthday:Date,
  nationality:String
});


module.exports = mongoose.model('Employee', EmployeeSchema);
