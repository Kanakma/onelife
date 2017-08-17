const mongoose = require('mongoose');

const ParrentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  childs:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  email: {
    type:String,
    default:'example@onelife.systems'
  },
  phone: {
    type:String,
    default:'+7-777-777-77-77'
  },
  address:{
    type:String,
    default:'Республика Казахстан, город Алматы, 050022, улица Фурманова, дом 58, этаж 10.'
  }
});


module.exports = mongoose.model('Parrent', ParrentSchema);


