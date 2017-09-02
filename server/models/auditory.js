const mongoose = require('mongoose');

const AuditorySchema = new mongoose.Schema({
  auditory_name: {
  	type:String,
  	lowercase: true
  },
  auditory_corp:String,
  auditory_level:Number,
  auditory_places:Number
});


module.exports = mongoose.model('Auditory', AuditorySchema);
